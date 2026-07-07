import { Scalar } from "@scalar/hono-api-reference"
import packageJSON from "../../package.json"
import type { AppOpenAPI } from "./types"

export default function configureOpenAPI(app: AppOpenAPI) {
  // The OpenAPI documentation will be available at /doc
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Lyra API",
    },
  })

  // Use the middleware to serve the Scalar API Reference at /scalar
  app.get(
    "/scalar",
    Scalar({
      pageTitle: "Lyra API",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      url: "/doc",
      theme: "kepler",
      // layout: "classic",
    }),
  )
}
