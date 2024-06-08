"use client";
import { EmailSheet } from "@/components/email-sheet";

export default function Page({ params }: { params: { id: string } }) {
  return <EmailSheet id={params.id} />;
}
