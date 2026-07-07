import { createRoute, z } from "@hono/zod-openapi"
import * as HTTPStatusCodes from "@/http-status-codes"
import { createRouter } from "@/lib/create-app"
import jsonContent from "@/openapi/helpers/json-content"

const indexRoute = createRoute({
  tags: ["index"],
  method: "get",
  path: "/",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z
        .object({
          message: z.string(),
        })
        .openapi({
          example: {
            message: "An example message here!",
          },
        }),
      "API index",
    ),
  },
})

const router = createRouter().openapi(indexRoute, (c) =>
  c.json(
    {
      message: "Hellooo API...",
    },
    HTTPStatusCodes.OK,
  ),
)

export default router
