import axios from "axios";

import { BASE_URL } from "../consts/consts";

export const FetchData = async (page: number, count: number) => {
  const response = await axios.get(BASE_URL, {
    params: {
      page,
      count,
    },
  });

  return response;
};
