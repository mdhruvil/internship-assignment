import { api } from "@/lib/api";
import type { InferRequestType, InferResponseType } from "hono";
import useSWR from "swr";

export function useEmails(req: InferRequestType<typeof api.v1.emails.$get>) {
  const url = api.v1.emails.$url(req);
 type ResponseType = InferResponseType<typeof api.v1.emails.$get>;
  return useSWR<ResponseType, Error>(url.toString(), async () => {
    const res = await api.v1.emails.$get(req);
    if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error)
    }
    return await res.json()
  });
}
