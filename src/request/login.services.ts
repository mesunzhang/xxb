import { GET } from "@/request/index";

export function login(params) {
  return GET("/fun/login", params);
}