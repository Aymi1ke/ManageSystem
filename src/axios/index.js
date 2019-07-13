import axios from 'axios'
import qs from "qs"
import router from '@/router'
 //自动切换环境
if (process.env.NODE_ENV == 'development') {            //测试环境
  axios.defaults.baseURL = 'http://192.168.101.10:8085';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'http://192.168.101.10:8085';
} else if (process.env.NODE_ENV == 'production') {        //正式IP
  axios.defaults.baseURL = 'http://118.31.56.223:8085';
}
 axios.defaults.baseURL = 'http://118.31.56.223:8085';
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// http request 请求拦截器
axios.interceptors.request.use(
  config => {
    if(config.method == "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1){
      router.push({
        path:'/timeout'
      })
    }
    if (error.response.status === 404) {
      router.push({
        path:'/404'
      })
    }
    if (error.response.status === 401) {
      router.push({
        path:'/limit'
      })
    }
    return Promise.reject(error.response);
  }
);


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
       axios.post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err)
      })
  });
}
export default {
  post(url,data){
    return post(url,data)
  }
}
