import { refreshAuth, setAuthCookie } from "@/utils/utils";
import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";

export const API = axios.create({
  baseURL: "https://digitalent.games.test.shopee.io/vm2/api",
});

API.interceptors.request.use(async (config) => {
  const accessToken = getCookie("accessToken");
  if (accessToken !== undefined) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    let originalRequest = err.config!;
    let refreshToken = getCookie("refreshToken");

    if (refreshToken !== undefined) {
      const newAuth = await refreshAuth(refreshToken);
      setAuthCookie(newAuth!);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAuth?.access_token}`;
      return axios(originalRequest);
    }

    return Promise.reject(err);
  }
);

// https://digitalent.games.test.shopee.io/vm2/api
// http://10.20.191.153:8000
