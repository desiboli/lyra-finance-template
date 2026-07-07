import { OpenAPIHono } from "@hono/zod-openapi"
import { auth } from "@lyra/auth"
import { env } from "@lyra/env/server"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import notFound from "@/middlewares/not-found"
import onError from "@/middlewares/on-error"
import defaultHook from "@/openapi/default-hook"
import type { AppBindings } from "./types"

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(logger())
  app.use(
    "/*",
    cors({
      origin: env.CORS_ORIGIN,
      allowMethods: ["GET", "POST", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )

  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

  app.notFound(notFound)
  app.onError(onError)

  return app
}
