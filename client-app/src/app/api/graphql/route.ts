import { NextRequest } from "next/server";
import { handler } from "@/graphql";

async function request(request: NextRequest) {
  return handler(request);
}

export { request as POST, request as GET };
