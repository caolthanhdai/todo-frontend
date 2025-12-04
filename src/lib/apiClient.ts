import axios from "axios"
import { getApiBaseUrl } from "./env"
import { API_TIMEOUT } from "./constants"
// create axios instance
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: API_TIMEOUT,
  withCredentials: true, // để gửi kèm cookie (refresh token HttpOnly)
})
