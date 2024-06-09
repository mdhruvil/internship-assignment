"use client";
import { getClassificationFromId, getMailFromId } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import useSWR from "swr";
import { Badge } from "./ui/badge";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

export function EmailDetails({ id }: { id: string }) {
  const classification = getClassificationFromId(id);
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
              {classification ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge>{classification.classification}</Badge>
                  <Badge variant="outline">
                    {classification.confidence} / 1.0
                  </Badge>
                  <p className="text-xs">Reason: {classification.reason}</p>
                </div>
              ) : null}
              <div className="mt-5 h-full">
                {email.bodyHtml && (
                  <iframe
                    srcDoc={email.bodyHtml}
                    className="h-[80vh] w-full"
                  ></iframe>
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
  const classification = getClassificationFromId(id);

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
              {classification ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge>{classification.classification}</Badge>
                  <Badge variant="outline">
                    {classification.confidence} / 1.0
                  </Badge>
                  <p className="text-xs">Reason: {classification.reason}</p>
                </div>
              ) : null}
              <div className="mt-5 h-full">
                {email.bodyHtml && (
                  <iframe
                    srcDoc={email.bodyHtml}
                    className="h-[80vh] w-full"
                  ></iframe>
                )}
              </div>
            </CardDescription>
          </CardHeader>
        </div>
      )}
    </>
  );
}
