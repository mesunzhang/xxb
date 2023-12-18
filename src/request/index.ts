import axios from "axios";

function fetch(url: string, method: string, params: any, options?: any) {
  let request: any = {
    // baseURL:'https://hi.kuaizou.cool',
    method,
    url
  };
  if (/get/i.test(method)) {
    request.params = params;
  } else {
    request.data = params;
  }
  Object.assign(request, options);
  return axios(request);
}

export function GET(url, params, options) {
  return fetch(url, "get", params, options);
}