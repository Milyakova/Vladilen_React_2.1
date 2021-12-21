import axios from "axios";
import { toast } from "react-toastify";
import configJson from "../config.json";

const http = axios.create({ baseURL: configJson.apiEndPoint });

http.interceptors.request.use(
  function (config) {
    if (configJson.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    console.log(config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (configJson.isFireBase) {
      res.data = { content: transformData(res.data) };
      console.log(res.data);
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("something get wrong try it later");
    }
    return Promise.reject(error);
  }
);
const httpServices = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};
export default httpServices;
