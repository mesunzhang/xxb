import { GET } from "@/request/index";

export function login(params) {
  return GET("/fun/login", params);
}

export function getUserInfo(params) {
  return GET("/fun/userInfo", params);
}