import { env } from "@/env";
import {
  Gmail,
  extractedMessageSchema,
  type ExtractedMessage,
} from "@/lib/gmail";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { Session } from "next-auth";
import { ZodError, z } from "zod";
import { getServerAuthSession } from "../auth";
import { Classifier } from "@/lib/classifier";

type Variables = {
  session: Session;
};

export const app = new Hono<{ Variables: Variables }>().basePath("/api/v1");

app.onError((err, c) => {
  return c.json({ error: err.message, data: null }, 500);
});

app.use(async (c, next) => {
  const session = await getServerAuthSession();
  if (!session) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  c.set("session", session);
  if (!session.accessToken) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  await next();
});

const emailRouter = new Hono<{ Variables: Variables }>().get(
  "/",
  zValidator(
    "query",
    z.object({
      numberOfMessages: z.coerce.number().default(10),
    }),
  ),
  async (c) => {
    const session = c.get("session");
    const { numberOfMessages } = c.req.valid("query");

    const gmail = new Gmail(env.GOOGLE_ACCESS_KEY, session.accessToken!);
    const emails = await gmail.getLastMessages(numberOfMessages);

    if (emails instanceof ZodError) {
      return c.json({ error: emails.message, data: [] }, 500);
    } else {
      return c.json({ data: emails as ExtractedMessage[], error: null }, 200);
    }
  },
);

const classifierRouter = new Hono<{ Variables: Variables }>().post(
  "/",
  zValidator(
    "json",
    z.object({
      messages: z.array(extractedMessageSchema),
      apiKey: z.string(),
    }),
  ),
  async (c) => {
    const { messages, apiKey } = c.req.valid("json");
    const classifier = new Classifier(apiKey);
    const classifications = await Promise.all(
      messages.map((m) => classifier.classify(m)),
    );
    const messagesWithClassifications = messages.map((m, i) => ({
      ...m,
      classification: classifications[i],
    }));
    return c.json({ messages: messagesWithClassifications, error: null }, 200);
  },
);

const router = app
  .route("/emails", emailRouter)
  .route("/classify", classifierRouter);

export type AppType = typeof router;
