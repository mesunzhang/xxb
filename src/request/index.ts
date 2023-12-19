import axios from "axios";
import { showNotify } from "vant";
import router from "@/router";

function fetch(url: string, method: string, params: any, options?: any) {

  let request: any = {
    method,
    url
  };
  if (/get/i.test(method)) {
    request.params = params;
  } else {
    request.data = params;
  }
  Object.assign(request, options);
  return axios(request).then(res => {
    if (res.data.code === 999) {
      router.push("/login");
    } else if (res.data.code !== 0) {
      showNotify({
        color: "#63b716",
        background: "#f0ffe1",
        message: res.data.msg
      });
    } else {
      return res.data;
    }
  }).catch(err => {
    console.log(err);
  });
}

export function GET(url, params, options) {
  return fetch(url, "get", params, options);
}

export function POST(url, params, options) {
  return fetch(url, "post", params, options);
}