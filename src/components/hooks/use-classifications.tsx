import { api } from "@/lib/api";
import type { InferResponseType, InferRequestType } from "hono";
import useSWRMutation from "swr/mutation";

export const useClassifications = () => {

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
  );
};
