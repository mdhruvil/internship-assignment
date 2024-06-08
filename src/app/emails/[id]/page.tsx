import { EmailDetailsCard } from "@/components/email-details";

export default function Page({ params }: { params: { id: string } }) {
  return <EmailDetailsCard id={params.id} />;
}
