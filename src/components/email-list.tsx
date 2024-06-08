"use client";

import { EmailCard } from "./email-card";
import { useEmails } from "./hooks/use-emails";

export function EmailList() {
  const { data, isLoading, error } = useEmails({
    query: { numberOfMessages: "10" },
  });
  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {error ? <div>Error: {error.message}</div> : null}
      {data ? (
        <div className="space-y-5">
          {data.data.map((email) => (
            <EmailCard key={email.id} email={email} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
