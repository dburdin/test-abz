import axios from "axios";

import { BASE_URL } from "../consts/consts";

import { ApiGetParams } from "../types/types";

export const FetchData = async (endpoint: string, params?: ApiGetParams) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await axios.get(url, { params });
  return response;
};

export const PostData = async (endpoint: string, token: string, data: FormData) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    Token: token,
    "Content-Type": "multipart/form-data",
  };
  const response = await axios.post(url, data, { headers });
  return response;
};
