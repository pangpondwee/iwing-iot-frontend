import axios from "axios";
import { getServerAuthSession } from "@/lib/auth";
import { getSession, useSession } from "next-auth/react";

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.request.use(
  async (config) => {
    const session = await getServerAuthSession(); // Retrieve the current session

    if (session && session.user.accessToken) {
      // Set the accessToken in the Authorization header
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Retrieve the current session

    if (session && session.user.accessToken) {
      // Set the accessToken in the Authorization header
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetchProject = async (searchQuery?: string, sortBy?: string) => {
  try {
    const { data } = await serverAxios.get(
      `/project?sortBy=${sortBy ? sortBy : "ascending"}${
        searchQuery ? `&searchQuery=${searchQuery}` : ""
      }`,
    );
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchData = async (path: string) => {
  try {
    const { data } = await serverAxios.get(path);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (path: string, body: any) => {
  try {
    const { data } = await clientAxios.post(path, body);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
};