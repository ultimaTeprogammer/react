/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 11:39:27
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 11:47:16
 * @FilePath: /react-jike/src/utils/request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const request: AxiosInstance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证 token 等
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可以根据后端返回格式进行统一处理
    const { data } = response
    return data
  },
  (error) => {
    // 统一错误处理
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)
// 定义请求方法类型
interface RequestConfig extends AxiosRequestConfig {
  url: string
  method: string
}

// 通用请求方法
const requestMethod = <T = unknown>(config: RequestConfig): Promise<T> => {
  return request(config)
}

// GET 请求
export const get = <T = unknown>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return requestMethod<T>({
    url,
    method: 'get',
    params,
    ...config
  })
}

// POST 请求
export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return requestMethod<T>({
    url,
    method: 'POST',
    data,
    ...config
  })
}

// PUT 请求
export const put = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return requestMethod<T>({
    url,
    method: 'PUT',
    data,
    ...config
  })
}

// DELETE 请求
export const del = <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return requestMethod<T>({
    url,
    method: 'DELETE',
    ...config
  })
}

export default request