import axios from "axios";

export const AxiosIntance = axios.create({
  baseURL: "https://6087d123a6f4a30017424e16.mockapi.io/api/",
  headers: { "Content-type": "application-json" },
});
