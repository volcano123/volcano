import axios from "axios";
import qs from "qs";

/*
 在吴忠
 楷哥电脑IP
 与厚镇对接地址
 */
axios.defaults.baseURL = "";

export const baseURL = axios.defaults.baseURL;
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
axios.defaults.transformRequest = [
  data => {
    /* if (data.__proto__.append) {
     return data;
     } else {
     return qs.stringify(data);
     } */
    return qs.stringify(data);
  }
];

// 请求超时(0表示无超时时间)
// 请求超时超过"timeout"的时间，请求将被终端
axios.defaults.timeout = 20000;

axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8";
export const getData = (url, param) => {
  return axios.get(`${url}`, {
    params: param
  });
};

export const postData = (url, param) => {
  return (
    // axios.create({
    //     url: url,
    //     data: param,
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8' }
    // })
    axios.post(`${url}`, param)
  );
};

export const allData = arr => {
  return axios.all(arr);
};

export const spreadCallBack = func => {
  return axios.spread(func);
};
