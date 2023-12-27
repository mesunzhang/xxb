import { GET } from "@/request/index";

export function login(params) {
  return GET("/fun/login", params);
}

export function getUserInfo(params) {
  return GET("/fun/userInfo", params);
}

export function getStepList(params) {
  return GET("fun/stepList", params);
}

export function setStep(params) {
  return GET("fun/setStep", params);
}