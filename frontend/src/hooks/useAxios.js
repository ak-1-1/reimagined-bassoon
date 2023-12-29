import axios from "axios";
import { useContext, useState } from "react";
import authContext from "../contexts/AuthContext";
import useBaseURL from "../hooks/useBaseURL";

const useAxios = () => {
  const { accessToken } = useContext(authContext);
  const { BACKEND_ENDPOINT } = useBaseURL();

  const axiosInstance = axios.create({
    baseURL: BACKEND_ENDPOINT + "/api", // Replace with your actual API URL
  });

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const get = async (url, config = {}) => {
    const response = await axiosInstance.get(url, config);
    return response.data;
  };

  const post = async (url, data, config = {}) => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  };

  const put = async (url, data, config = {}) => {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  };

  const del = async (url, config = {}) => {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  };

  const options = async (url, config = {}) => {
    const response = await axiosInstance.options(url, config);
    return response.data;
  };

  return { get, post, put, del, options }; // alias delete to avoid conflict with reserved keyword
};

export default useAxios;
