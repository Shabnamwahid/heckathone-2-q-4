import { NextRequest, NextResponse } from "next/server"
import { createAuthClient } from "better-auth/react"  // adjust if needed

export async function GET(request: NextRequest, context: { params: Promise<any> }) {
  const params = await context.params  // <--- MUST await here!
  console.log("Params in auth route:", params)  // debug

  // Your original logic or better-auth handler here
  // If using better-auth handler, wrap it like this:
  // const authClient = createAuthClient({ baseURL: "http://127.0.0.1:3001" })
  // return authClient.GET(request, { params }) or similar
  // For simple proxy/fallback, return NextResponse.json({ message: "Auth route ok" })

  return NextResponse.json({ status: "ok" })  // temporary to test if route loads
}

export async function POST(request: NextRequest, context: { params: Promise<any> }) {
  const params = await context.params
  console.log("Params in POST:", params)

  // same as above for POST
  return NextResponse.json({ status: "ok" })
}