import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { API } from "./network";
import { useUserStore } from "./store/userStore";
import { IAPILoginResponse, IAPIResponse } from "./interfaces/api_interface";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const middleware = async (req: NextRequest) => {
  let accessToken = req.cookies.get("accessToken");
  let refreshToken = req.cookies.get("refreshToken");

  if (req.nextUrl.pathname.startsWith("/user")) {
    if (accessToken !== undefined) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (accessToken !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
};
