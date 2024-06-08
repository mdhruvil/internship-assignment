"use client";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

export default function InfoButton({ content }: { content: string }) {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          className="size-7"
          size="icon"
          variant="outline"
        >
          <QuestionMarkCircledIcon className="h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>{content}</HoverCardContent>
    </HoverCard>
  );
}
