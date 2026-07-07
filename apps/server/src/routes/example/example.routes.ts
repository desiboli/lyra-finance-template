import { createRoute, z } from "@hono/zod-openapi"
import * as HTTPStatusCodes from "@/http-status-codes"
import jsonContent from "@/openapi/helpers/json-content"

const tags = ["Examples"]

export const list = createRoute({
  tags,
  path: "/example",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          name: z.string(),
          done: z.boolean(),
        }),
      ),
      "The list of tasks",
    ),
  },
})

export type ListRoute = typeof list
