import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken");

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (accessToken !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
};
