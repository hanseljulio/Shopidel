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

  const checkAuth = async () => {
    if (accessToken === undefined) {
      if (refreshToken !== undefined) {
        try {
          const res = await fetch(
            "https://digitalent.games.test.shopee.io/vm2/api/accounts/refresh-token",
            {
              method: "POST",
              body: JSON.stringify({
                refresh_token: (refreshToken as RequestCookie).value,
              }),
            }
          );

          if (!res.ok) {
            console.log("meh1");
            throw new Error(res.statusText);
          }
          const data = ((await res.json()) as IAPIResponse<IAPILoginResponse>)
            .data;

          req.cookies.set("accessToken", data?.access_token!);
          req.cookies.set("refreshToken", data?.refresh_token!);
          return true;
        } catch (e) {
          console.log(e);
          req.cookies.delete("refreshToken");
          return false;
        }
      } else {
        console.log("meh");
        return false;
      }
    }
    return true;
  };

  if (req.nextUrl.pathname.startsWith("/user")) {
    if (await checkAuth()) {
      console.log("yes");
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (await checkAuth()) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
};
