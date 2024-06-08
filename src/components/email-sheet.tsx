"use client";
import { useRouter } from "next/navigation";
import { EmailDetails } from "./email-details";
import { Sheet } from "./ui/sheet";

export function EmailSheet({ id }: { id: string }) {
  const router = useRouter();

  function onOpenChange() {
    router.back();
  }

  return (
    <Sheet defaultOpen open onOpenChange={onOpenChange}>
      <EmailDetails id={id} />
    </Sheet>
  );
}
