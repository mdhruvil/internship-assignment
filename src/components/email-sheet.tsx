"use client";
import type { ExtractedMessage } from "@/lib/gmail";
import { formatDistanceToNow } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function EmailSheetWrapper({
  children,
  email,
}: {
  children: React.ReactNode;
  email: ExtractedMessage;
}) {
  return (
    <Sheet>
      <SheetTrigger className="w-full">{children}</SheetTrigger>
      <SheetContent className="md:[50vw] w-[90vw] overflow-y-scroll sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>{email.subject}</SheetTitle>
          <SheetDescription>
            <div>
              <p>Sender: {email.sender}</p>
              <p>{formatDistanceToNow(email.sentTime, { addSuffix: true })}</p>
            </div>
            <div className="mt-5 h-full">
              {email.bodyHtml && (
                <div dangerouslySetInnerHTML={{ __html: email.bodyHtml }} />
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
