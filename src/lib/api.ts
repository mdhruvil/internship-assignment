import { env } from "@/env";
import type { AppType } from "@/server/api";
import { hc } from "hono/client";

export const { api } = hc<AppType>(env.NEXT_PUBLIC_APP_URL);
