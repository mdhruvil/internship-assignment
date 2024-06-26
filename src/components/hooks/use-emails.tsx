import { api } from "@/lib/api";
import { saveMailsInLocalStorage } from "@/lib/utils";
import type { InferRequestType, InferResponseType } from "hono";
import useSWR from "swr";
import { useToast } from "../ui/use-toast";

export function useEmails(req: InferRequestType<typeof api.v1.emails.$get>) {
  const { toast } = useToast();
  type ResponseType = InferResponseType<typeof api.v1.emails.$get>;
  return useSWR<ResponseType, Error>(
    "/api/v1/emails",
    async () => {
      const res = await api.v1.emails.$get(req);
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error);
      }
      return await res.json();
    },
    {
      revalidateOnFocus: false,
      onSuccess(data) {
        saveMailsInLocalStorage(data.data);
      },
      onError(error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      },
    },
  );
}
