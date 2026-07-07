import createApp from "./lib/create-app"
import configureOpenAPI from "./lib/configure-openapi"
import indexRoute from "./routes/index.route"
import exampleRoute from "./routes/example/example.index"
import polarRoute from "./routes/polar/polar.index"
import aiRoute from "./routes/ai/ai.index"

const app = createApp()

configureOpenAPI(app)

const routes = [indexRoute, exampleRoute, polarRoute, aiRoute]

for (const route of routes) {
  app.route("/", route)
}
// routes.forEach((route) => {
//   app.route("/", route)
// })

export default app
