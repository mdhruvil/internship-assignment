import type { ExtractedMessage } from "@/lib/gmail";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";

export function EmailCard({ email }: { email: ExtractedMessage }) {
  return (
    <div>
      <button className="flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
        <div className="flex w-full flex-col gap-1">
          <div>
            <div>
              <p className="font-semibold line-clamp-1 text-lg">{email.subject}</p>
              <p className="font-medium line-clamp-1 text-sm">{email.sender}</p>
            </div>
            <div className="text-xs mt-2"> 
              {formatDistanceToNow(new Date(email.sentTime), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {email.snippet}
        </div>
        {email.labelIds.length ? (
          <div className="flex items-center gap-2 flex-wrap">
            {email.labelIds.map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
      </button>
    </div>
  );
}
