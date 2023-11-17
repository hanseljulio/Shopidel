import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  let accessToken = req.cookies.get("accessToken");

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (accessToken !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // if (req.nextUrl.pathname.startsWith("/search")) {
  //   const nextUrl = req.nextUrl;
  //   nextUrl.searchParams.forEach((item, key) => {
  //     if (item == "") {
  //       console.log("yes");
  //       nextUrl.searchParams.delete(key);
  //     }
  //   });

  //   console.log(nextUrl);

  //   return NextResponse.rewrite(nextUrl);
  // }
};
