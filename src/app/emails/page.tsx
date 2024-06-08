import { EmailList } from "@/components/email-list";
import { SignOutBtn } from "@/components/sign-out-btn";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateInitials } from "@/lib/utils";
import { checkAuthOrRedirect } from "@/server/auth";

export default async function Emails() {
  const session = await checkAuthOrRedirect();
  return (
    <div className="container mx-auto mt-10 max-w-5xl">
      
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>
              {generateInitials(session.user.name ?? "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium leading-none">{session.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <SignOutBtn />
        </div>
      </div>
      <div className="mt-10">
        <EmailList />
      </div>
    </div>
  );
}
