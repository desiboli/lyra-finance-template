import { devToolsMiddleware } from "@ai-sdk/devtools";
import { google } from "@ai-sdk/google";
import { auth } from "@lyra/auth";
import { env } from "@lyra/env/server";
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  convertToModelMessages,
  wrapLanguageModel,
} from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const nativeAppUrl = "lyra://";
const allowedNativeProtocols = new Set(["exp:", new URL(nativeAppUrl).protocol]);

app.get("/polar/success", (c) => {
  const requestUrl = new URL(c.req.url);
  const returnUrl = requestUrl.searchParams.get("returnUrl") || nativeAppUrl;

  let redirectUrl: URL;
  try {
    redirectUrl = new URL(returnUrl);
  } catch {
    return c.text("Invalid return URL", 400);
  }

  if (!allowedNativeProtocols.has(redirectUrl.protocol)) {
    return c.text("Invalid return URL", 400);
  }

  return c.redirect(redirectUrl.toString(), 302);
});

app.post("/ai", async (c) => {
  const body = await c.req.json();
  const uiMessages = body.messages || [];
  const model = wrapLanguageModel({
    model: google("gemini-2.5-flash"),
    middleware: devToolsMiddleware(),
  });
  const result = streamText({
    model,
    messages: await convertToModelMessages(uiMessages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
});

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
