"use client";
import { getMailFromId } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import useSWR from "swr";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

export function EmailDetails({ id }: { id: string }) {
  const { data: email } = useSWR("/local/" + id, () => {
    return getMailFromId(id);
  });

  return (
    <>
      {email && (
        <SheetContent className="md:[50vw] w-[90vw] overflow-y-scroll sm:max-w-5xl">
          <SheetHeader>
            <SheetTitle>{email.subject}</SheetTitle>
            <SheetDescription>
              <div>
                <p>Sender: {email.sender}</p>
                <p>
                  {formatDistanceToNow(email.sentTime, { addSuffix: true })}
                </p>
              </div>
              <div className="mt-5 h-full">
                {email.bodyHtml && (
                  <div dangerouslySetInnerHTML={{ __html: email.bodyHtml }} />
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      )}
    </>
  );
}

export function EmailDetailsCard({ id }: { id: string }) {
  const { data: email } = useSWR("/local/" + id, () => {
    return getMailFromId(id);
  });

  return (
    <>
      {email && (
        <div className="md:[50vw] mx-auto w-[90vw] overflow-y-scroll sm:max-w-5xl">
          <CardHeader>
            <CardTitle>{email.subject}</CardTitle>
            <CardDescription>
              <div>
                <p>Sender: {email.sender}</p>
                <p>
                  {formatDistanceToNow(email.sentTime, { addSuffix: true })}
                </p>
              </div>
              <div className="mt-5 h-full">
                {email.bodyHtml && (
                  <div dangerouslySetInnerHTML={{ __html: email.bodyHtml }} />
                )}
              </div>
            </CardDescription>
          </CardHeader>
        </div>
      )}
    </>
  );
}
