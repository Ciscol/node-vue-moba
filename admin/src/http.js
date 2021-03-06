import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

/* axios拦截器 */
// 请求头添加token信息
http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// 响应信息拦截
http.interceptors.response.use(res => {
  return res;
}, err => {
  // 错误信息弹出
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    }
    // 登录失败，跳转到登录页
  if (err.response.status === 401) {
    router.push('/login');
  }
  return Promise.reject(err);
})


export default http;