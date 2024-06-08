"use client";

import { useState } from "react";
import { EmailCard } from "./email-card";
import { EmailSheetWrapper } from "./email-sheet";
import { useEmails } from "./hooks/use-emails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flushSync } from "react-dom";
import { EmailSkeleton } from "./email-skeleton";

const EMAIL_NUMBERS = ["5", "10", "15", "20", "25"];

export function EmailList() {
  const [numberOfEmails, setNumberOfEmails] = useState("10");
  const { data, isValidating, isLoading, error, mutate } = useEmails({
    query: { numberOfMessages: numberOfEmails },
  });

  async function onSelectChange(value: string) {
    flushSync(() => {
      setNumberOfEmails(value);
    });
    await mutate();
  }
  return (
    <div>
      <div className="pb-5">
        <Select onValueChange={onSelectChange} value={numberOfEmails}>
          <SelectTrigger className="max-w-[150px]">
            <SelectValue placeholder={numberOfEmails} />
          </SelectTrigger>
          <SelectContent>
            {EMAIL_NUMBERS.map((number) => {
              return (
                <SelectItem key={number} value={number}>
                  {number}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {isLoading || isValidating ? (
        <div className="space-y-5">
          {Array.from({ length: parseInt(numberOfEmails) }).map((_, i) => (
            <EmailSkeleton key={i} />
          ))}
        </div>
      ) : null}

      {error ? <div>Error: {error.message}</div> : null}

      {data && !isValidating && !isLoading ? (
        <div className="space-y-5">
          {data.data.map((email) => (
            <EmailSheetWrapper key={email.id} email={email}>
              <EmailCard email={email} />
            </EmailSheetWrapper>
          ))}
        </div>
      ) : null}
    </div>
  );
}
