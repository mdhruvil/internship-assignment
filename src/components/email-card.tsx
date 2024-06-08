"use client";

import type { ExtractedMessage } from "@/lib/gmail";
import { getClassificationFromId } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import InfoButton from "./ui/info-button";

export function EmailCard({ email }: { email: ExtractedMessage }) {
  const router = useRouter();
  const classification = getClassificationFromId(email.id);

  function clickHandler() {
    router.push(`/emails/${email.id}`);
  }
  return (
    <button
      className="flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
      onClick={clickHandler}
    >
      <div className="flex w-full flex-col gap-1">
        <div>
          <div>
            <p className="line-clamp-1 text-lg font-semibold">
              {email.subject}
            </p>
            <p className="line-clamp-1 text-sm font-medium">{email.sender}</p>
          </div>
          <div className="mt-2 text-xs">
            {formatDistanceToNow(new Date(email.sentTime), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {email.snippet}
      </div>
      {classification ? (
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{classification.classification}</Badge>
          <Badge variant="outline">{classification.confidence} / 1.0</Badge>
          <InfoButton content={classification.reason} />
        </div>
      ) : null}
    </button>
  );
}
