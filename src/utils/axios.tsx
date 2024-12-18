"use client";
import axios from "axios";
import Cookies from "js-cookie";
export const axiosInstance = () => {
  const token =
    typeof localStorage !== "undefined" ? Cookies.get("token") : "";

  return axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
