import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { Gmail } from "@/server/gmail";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    return <div>You are not logged in</div>;
  }

  if (!session.accessToken) {
    return <div>No access token</div>;
  }
  const gmail = new Gmail(env.GOOGLE_ACCESS_KEY, session.accessToken);

  const messages= await gmail.getLastMessages(50)
  return (
   <div>
    
    {JSON.stringify(messages)}
   </div>
  );
}
