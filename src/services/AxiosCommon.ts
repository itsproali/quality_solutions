import axios from "axios";
import { getSession } from "next-auth/react";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const authFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// authFetch.interceptors.request.use((config) => {
//   if (jwtToken) {
//     config.headers!.Authorization = `Bearer ${jwtToken}`;
//   }
//   return config;
// });

export const handleErros = (error: any) => {
  console.log(error);
};

export default authFetch;
