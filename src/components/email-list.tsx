"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { flushSync } from "react-dom";
import { EmailCard } from "./email-card";
import { EmailSkeleton } from "./email-skeleton";
import { useEmails } from "./hooks/use-emails";
import { useClassifications } from "./hooks/use-classifications";
import { Button } from "./ui/button";
import {
  getApiKeyFromLocalStorage,
  getMailsFromLocalStorage,
} from "@/lib/utils";
import { useRouter } from "next/navigation";

const EMAIL_NUMBERS = ["2", "5", "10", "15", "20", "25"];

export function EmailList() {
  const [numberOfEmails, setNumberOfEmails] = useState("5");

  const { data, isValidating, isLoading, error, mutate } = useEmails({
    query: { numberOfMessages: numberOfEmails },
  });
  const { trigger } = useClassifications();
  const router = useRouter();

  async function onSelectChange(value: string) {
    flushSync(() => {
      setNumberOfEmails(value);
    });
    await mutate();
  }

  async function triggerClassify() {
    const mails = getMailsFromLocalStorage();
    const apiKey = getApiKeyFromLocalStorage();
    if (!apiKey) {
      alert("Please enter your OpenAI API key");
      return router.push("/");
    }
    const data = {
      messages: mails,
      apiKey,
    };
    //@ts-expect-error idk
    await trigger({ json: data });
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
        <Button onClick={triggerClassify}>Classify</Button>
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
            <EmailCard key={email.id} email={email} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
