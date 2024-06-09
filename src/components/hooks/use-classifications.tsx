import { api } from "@/lib/api";
import type { Classification } from "@/lib/classifier";
import type { InferRequestType, InferResponseType } from "hono";
import useSWRMutation from "swr/mutation";
import { useToast } from "../ui/use-toast";

export const useClassifications = () => {
  const { toast } = useToast();
  const fetcher = async (
    key: string,
    { arg }: { arg: InferRequestType<typeof api.v1.classify.$post> },
  ) => {
    const res = await api.v1.classify.$post(arg);
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error ?? "Unknown error");
    }
    return await res.json();
  };

  return useSWRMutation<InferResponseType<typeof api.v1.classify.$post>, Error>(
    "/api/v1/classify",
    fetcher,
    {
      onSuccess(data) {
        const classifications = data.messages.map((m) => {
          return {
            id: m.id,
            ...m.classification,
          } as Classification & { id: string };
        });
        localStorage.setItem(
          "classifications",
          JSON.stringify(classifications),
        );
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
};
