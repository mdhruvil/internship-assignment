import { env } from "@/env";
import { Gmail } from "@/lib/gmail";
import { getServerAuthSession } from "@/server/auth";
import { ZodError } from "zod";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    return <div>You are not logged in</div>;
  }

  if (!session.accessToken) {
    return <div>No access token</div>;
  }
  // const gmail = new Gmail(env.GOOGLE_ACCESS_KEY, session.accessToken);

  const messages: object[]= []

  return (
    <div>
      {JSON.stringify(session)}
      <br />
      <br />
      <br />
      {messages.map((m, i) => {
        if (m instanceof ZodError) {
          return <div key={i}>{m.issues.toString()}</div>
        }
        return <div key={i}>
        </div>
      })}
    </div>
  );
}
