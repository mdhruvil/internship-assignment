import { OpenAIKeyInput } from "@/components/open-ai-key-input";
import { SignInBtn } from "@/components/sign-in-btn";
import { SignOutBtn } from "@/components/sign-out-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateInitials } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  return (
    <div className="container">
      <div className="mx-auto mt-10 max-w-sm">
        {!session && <SignInBtn className="w-full" variant="outline" />}
        {session && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={session.user.image ?? ""} />
                  <AvatarFallback>
                    {generateInitials(session.user.name ?? "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>
              <SignOutBtn variant="outline" />
            </div>
          </>
        )}
      </div>
      <Card className="mx-auto mt-5 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">OpenAI Key</CardTitle>
          <CardDescription>
            Your key is not saved in database. It is only stored in your
            browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OpenAIKeyInput />
        </CardContent>
      </Card>
    </div>
  );
}
