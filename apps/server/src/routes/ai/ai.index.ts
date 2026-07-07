import { createRouter } from "@/lib/create-app"
import { devToolsMiddleware } from "@ai-sdk/devtools"
import { google } from "@ai-sdk/google"
import { streamText, convertToModelMessages, wrapLanguageModel } from "ai"

const router = createRouter().post("/ai", async (c) => {
  const body = await c.req.json()
  const uiMessages = body.messages || []
  const model = wrapLanguageModel({
    model: google("gemini-2.5-flash"),
    middleware: devToolsMiddleware(),
  })
  const result = streamText({
    model,
    messages: await convertToModelMessages(uiMessages),
  })

  return result.toUIMessageStreamResponse()
})

export default router
