import type { ExtractedMessage } from "@/lib/gmail";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";

export function EmailCard({ email }: { email: ExtractedMessage }) {
    return <div>
         <button
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            )}
            
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{email.subject}</div>
                  
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                  )}
                >
                  {formatDistanceToNow(new Date(email.sentTime), { 
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{email.sender}</div> 
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {email.snippet}
            </div>
            {email.labelIds.length ? (
              <div className="flex items-center gap-2">
                {email.labelIds.map((label) => (
                  <Badge key={label} variant="outline">
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
    </div>
    
}