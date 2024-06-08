import { Hono } from "hono";
import { getServerAuthSession } from "../auth";
import type { Session } from "next-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Gmail } from "@/lib/gmail";
import { env } from "@/env";

type Variables = {
  session: Session;
};

export const app = new Hono<{ Variables: Variables }>().basePath("/api/v1");

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

app.get(
  "/emails",
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

    return c.json({ emails });
  },
);
