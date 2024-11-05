"use client";
import axios from "axios";

export const axiosInstance = axios.create({
    url: "/api",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})