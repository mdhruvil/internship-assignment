import { EmailCard } from "@/components/email-card";
import { SignOutBtn } from "@/components/sign-out-btn";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateInitials } from "@/lib/utils";
import { checkAuthOrRedirect } from "@/server/auth";

const tempEmail = {
  sender: "Google <no-reply@accounts.google.com>",
  sentTime: "Sat, 08 Jun 2024 04:26:45 GMT",
  subject: "Security alert",
  snippet:
    "Slides AI Gmail Classification was granted access to your Google account bgmiislobe1@gmail.com If you did not grant access, you should check this activity and secure your account. Check activity You",
  bodyText:
    "[image: Google]\r\nSlides AI Gmail Classification was granted access to your Google account\r\n\r\n\r\nbgmiislobe1@gmail.com\r\n\r\nIf you did not grant access, you should check this activity and secure your\r\naccount.\r\nCheck activity\r\n<https://accounts.google.com/AccountChooser?Email=bgmiislobe1@gmail.com&continue=https://myaccount.google.com/alert/nt/1717820805000?rfn%3D127%26rfnc%3D1%26eid%3D-294221642524359702%26et%3D0>\r\nYou can also see security activity at\r\nhttps://myaccount.google.com/notifications\r\nYou received this email to let you know about important changes to your\r\nGoogle Account and services.\r\n© 2024 Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA\r\n",
  bodyHtml:
    '<!DOCTYPE html><html lang="en"><head><meta name="format-detection" content="email=no"/><meta name="format-detection" content="date=no"/><style nonce="LsH65FyCyzEXEthLsYgbhw">.awl a {color: #FFFFFF; text-decoration: none;} .abml a {color: #000000; font-family: Roboto-Medium,Helvetica,Arial,sans-serif; font-weight: bold; text-decoration: none;} .adgl a {color: rgba(0, 0, 0, 0.87); text-decoration: none;} .afal a {color: #b0b0b0; text-decoration: none;} @media screen and (min-width: 600px) {.v2sp {padding: 6px 30px 0px;} .v2rsp {padding: 0px 10px;}} @media screen and (min-width: 600px) {.mdv2rw {padding: 40px 40px;}} </style><link href="//fonts.googleapis.com/css?family=Google+Sans" rel="stylesheet" type="text/css" nonce="LsH65FyCyzEXEthLsYgbhw"/></head><body style="margin: 0; padding: 0;" bgcolor="#FFFFFF"><table width="100%" height="100%" style="min-width: 348px;" border="0" cellspacing="0" cellpadding="0" lang="en"><tr height="32" style="height: 32px;"><td></td></tr><tr align="center"><td><div itemscope itemtype="//schema.org/EmailMessage"><div itemprop="action" itemscope itemtype="//schema.org/ViewAction"><link itemprop="url" href="https://accounts.google.com/AccountChooser?Email=bgmiislobe1@gmail.com&amp;continue=https://myaccount.google.com/alert/nt/1717820805000?rfn%3D127%26rfnc%3D1%26eid%3D-294221642524359702%26et%3D0"/><meta itemprop="name" content="Review Activity"/></div></div><table border="0" cellspacing="0" cellpadding="0" style="padding-bottom: 20px; max-width: 516px; min-width: 220px;"><tr><td width="8" style="width: 8px;"></td><td><div style="border-style: solid; border-width: thin; border-color:#dadce0; border-radius: 8px; padding: 40px 20px;" align="center" class="mdv2rw"><img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_74x24dp.png" width="74" height="24" aria-hidden="true" style="margin-bottom: 16px;" alt="Google"><div style="font-family: &#39;Google Sans&#39;,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom: thin solid #dadce0; color: rgba(0,0,0,0.87); line-height: 32px; padding-bottom: 24px;text-align: center; word-break: break-word;"><div style="font-size: 24px;"><a>Slides AI Gmail Classification</a> was granted access to your Google&nbsp;account </div><table align="center" style="margin-top:8px;"><tr style="line-height: normal;"><td align="right" style="padding-right:8px;"><img width="20" height="20" style="width: 20px; height: 20px; vertical-align: sub; border-radius: 50%;;" src="https://lh3.googleusercontent.com/a/ACg8ocIePQ4S-X2Q3VJILnhTMOlsEp0QzFMgtw5qXaBSGJkyLR4FtA=s96-c" alt=""></td><td><a style="font-family: &#39;Google Sans&#39;,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color: rgba(0,0,0,0.87); font-size: 14px; line-height: 20px;">bgmiislobe1@gmail.com</a></td></tr></table> </div><div style="font-family: Roboto-Regular,Helvetica,Arial,sans-serif; font-size: 14px; color: rgba(0,0,0,0.87); line-height: 20px;padding-top: 20px; text-align: left;"><br>If you did not grant access, you should check this activity and secure your account.<div style="padding-top: 32px; text-align: center;"><a href="https://accounts.google.com/AccountChooser?Email=bgmiislobe1@gmail.com&amp;continue=https://myaccount.google.com/alert/nt/1717820805000?rfn%3D127%26rfnc%3D1%26eid%3D-294221642524359702%26et%3D0" target="_blank" link-id="main-button-link" style="font-family: &#39;Google Sans&#39;,Roboto,RobotoDraft,Helvetica,Arial,sans-serif; line-height: 16px; color: #ffffff; font-weight: 400; text-decoration: none;font-size: 14px;display:inline-block;padding: 10px 24px;background-color: #4184F3; border-radius: 5px; min-width: 90px;">Check activity</a></div></div><div style="padding-top: 20px; font-size: 12px; line-height: 16px; color: #5f6368; letter-spacing: 0.3px; text-align: center">You can also see security activity at<br><a style="color: rgba(0, 0, 0, 0.87);text-decoration: inherit;">https://myaccount.google.com/notifications</a></div></div><div style="text-align: left;"><div style="font-family: Roboto-Regular,Helvetica,Arial,sans-serif;color: rgba(0,0,0,0.54); font-size: 11px; line-height: 18px; padding-top: 12px; text-align: center;"><div>You received this email to let you know about important changes to your Google Account and services.</div><div style="direction: ltr;">&copy; 2024 Google LLC, <a class="afal" style="font-family: Roboto-Regular,Helvetica,Arial,sans-serif;color: rgba(0,0,0,0.54); font-size: 11px; line-height: 18px; padding-top: 12px; text-align: center;">1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</a></div></div></div></td><td width="8" style="width: 8px;"></td></tr></table></td></tr><tr height="32" style="height: 32px;"><td></td></tr></table></body></html>',
  id: "18ff6195462149fd",
  labelIds: ["UNREAD", "CATEGORY_UPDATES", "INBOX"],
};

export default async function Emails() {
  const session = await checkAuthOrRedirect();
  return (
    <div className="container mx-auto mt-10 md:px-20 lg:px-32">
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
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
        <EmailCard email={tempEmail} />
      </div>
    </div>
  );
}
