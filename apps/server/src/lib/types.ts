import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"

export interface AppBindings {
  Bindings: Record<string, never>
  Variables: Record<string, never>
}

export type AppOpenAPI = OpenAPIHono<AppBindings>
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>
