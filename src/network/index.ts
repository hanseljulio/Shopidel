import { IAPILoginResponse, IAPIResponse } from "@/interfaces/api_interface";
import { useUserStore } from "@/store/userStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const API = axios.create({
  baseURL: "https://digitalent.games.test.shopee.io/vm2/api",
});

const refreshAccessToken = async (token: string) => {
  try {
    const res = await API.post("/accounts/refresh-token", {
      refresh_token: token,
    });

    return (res.data as IAPIResponse<IAPILoginResponse>).data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e);
    }
  }
};

API.interceptors.request.use((config) => {
  console.log(config);

  if (config.data !== undefined) {
    console.log(config.data);
    // console.log(config.data.refreshToken);
    // console.log(config.data.accessToken);
    // const accessTokenDecodeExp = new Date(
    //   jwtDecode(config.data.accessToken).exp! * 1000
    // ).toLocaleString();
    // const refreshTokenDecodeExp = new Date(
    //   jwtDecode(config.data.refreshToken).exp! * 1000
    // ).toLocaleString();
    // console.log(accessTokenDecodeExp);
    // console.log(refreshTokenDecodeExp);
    // console.log(new Date().toLocaleString());
    // config.headers["Authorization"] = `Bearer ${config.data.accessToken}`;
    // config.headers["Accept"] = "application/json";
  }
  return config;
});

// API.interceptors.response.use(
//   (res: AxiosResponse) => {
//     console.log(res);
//     return res;
//   },
//   async (err: AxiosError) => {
//     if (err.response?.status === 401) {
//       console.log(err.config);
//       const refreshToken = JSON.parse(err.config?.data).refreshToken;
//       const data = await refreshAccessToken(refreshToken);

//       axios.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${data?.access_token}`;

//       console.log(err.config);

//       return axios.create(err.config);
//     }
//   }
// );

// https://digitalent.games.test.shopee.io/vm2/api
// http://10.20.191.153:8000
