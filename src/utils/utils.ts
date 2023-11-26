import {
  IAPILoginResponse,
  IAPIResponse,
  IAPIUserProfileResponse,
} from "@/interfaces/api_interface";
import { API } from "@/network";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { GetServerSidePropsContext } from "next";
import { NextRouter, useRouter } from "next/router";

export const currencyConverter = (money: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};

export const emailConverter = (email: string) => {
  let emailArray = email.split("@");
  let censoredUserName =
    emailArray[0].substring(0, 2) + emailArray[0].slice(3).replace(/./g, "*");

  emailArray[0] = censoredUserName;

  return emailArray.join("@");
};

export const dateConverter = (date: string) => {
  const dateArray = date.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${dateArray[2]} ${months[parseInt(dateArray[1]) - 1]} ${
    dateArray[0]
  }`;
};

export const checkAuthSSR = async (context: GetServerSidePropsContext) => {
  let accessToken = context.req.cookies["accessToken"];
  let refreshToken = context.req.cookies["refreshToken"];

  if (accessToken === undefined) {
    if (refreshToken !== undefined) {
      return await refreshAuth(refreshToken);
    }
    return null;
  }
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  } as IAPILoginResponse;
};

export const refreshAuth = async (token: string) => {
  try {
    const res = await API.post("/accounts/refresh-token", {
      refresh_token: token,
    });

    return (res.data as IAPIResponse<IAPILoginResponse>).data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e);
    }
    return null;
  }
};

export const setAuthCookie = (auth: IAPILoginResponse) => {
  const decodedAccessToken = jwtDecode(auth?.access_token!);
  const decodedRefreshToken = jwtDecode(auth?.refresh_token!);
  setCookie("accessToken", auth?.access_token, {
    expires: new Date(decodedAccessToken.exp! * 1000),
  });
  setCookie("refreshToken", auth?.refresh_token, {
    expires: new Date(decodedRefreshToken.exp! * 1000),
  });
};

export const clientUnauthorizeHandler = (
  router: NextRouter,
  updateUser: (data: IAPIUserProfileResponse | undefined) => void
) => {
  updateUser(undefined);
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  router.push("/login?session_expired=true");
};

export const getYoutubeVideoId = (url: string) => {
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);

  return match?.[1] || null;
};
