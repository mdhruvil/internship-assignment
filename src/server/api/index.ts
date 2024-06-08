import { Hono } from "hono";
import { getServerAuthSession } from "../auth";
import type { Session } from "next-auth";
import { zValidator } from "@hono/zod-validator";
import { ZodError, z } from "zod";
import { ExtractedMessage, Gmail } from "@/lib/gmail";
import { env } from "@/env";
import { error } from "console";

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

const router = app.route("/emails", emailRouter);
export type AppType = typeof router;
