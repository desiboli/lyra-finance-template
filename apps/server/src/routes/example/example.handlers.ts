import type { AppRouteHandler } from "@/lib/types"
import type { ListRoute } from "./example.routes"

export const list: AppRouteHandler<ListRoute> = (c) =>
  c.json([
    {
      name: "Learn Hono",
      done: false,
    },
  ])
