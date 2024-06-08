import { getServerAuthSession } from "@/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    return <div>You are not logged in</div>;
  }

  if (!session.accessToken) {
    return <div>No access token</div>;
  }
  // const gmail = new Gmail(env.GOOGLE_ACCESS_KEY, session.accessToken);

  // const messages= await gmail.getLastMessages(50)
  return (
   <div>
    {JSON.stringify(session)}
    {/* {JSON.stringify(messages)} */}
   </div>
  );
}
