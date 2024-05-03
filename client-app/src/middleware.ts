import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, publicRoutes } from "./config/routesConfig";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });

  if (authRoutes.includes(req.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
