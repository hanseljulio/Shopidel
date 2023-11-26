import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface IJWTData {
  user_id: number;
  role: string;
  wallet_number: string;
  iss: string;
  exp: number;
  iat: number;
}

export const middleware = async (req: NextRequest) => {
  let accessToken = req.cookies.get("accessToken");

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (accessToken !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/myshop") {
    if (accessToken === undefined) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/myshop")) {
    if (accessToken === undefined) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = (jwtDecode(accessToken?.value!) as IJWTData).role;
    if (role === "seller") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/myshop", req.url));
  }
};
