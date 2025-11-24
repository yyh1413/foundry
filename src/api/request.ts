import { message } from "antd"
import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios"

// 创建 axios 实例
const request: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
})

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		// 从 localStorage 获取 token
		const token = localStorage.getItem("token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// 响应拦截器
request.interceptors.response.use(
	(response: AxiosResponse) => {
		const { data } = response

		// 根据实际后端返回的数据结构调整
		if (data.code === 200 || data.success) {
			return data
		}

		// 处理错误
		message.error(data.message || "请求失败")
		return Promise.reject(new Error(data.message || "请求失败"))
	},
	(error) => {
		// 处理 HTTP 错误状态码
		if (error.response) {
			switch (error.response.status) {
				case 401:
					message.error("未授权，请重新登录")
					// 清除 token 并跳转到登录页
					localStorage.removeItem("token")
					window.location.href = "/login"
					break
				case 403:
					message.error("拒绝访问")
					break
				case 404:
					message.error("请求地址不存在")
					break
				case 500:
					message.error("服务器错误")
					break
				default:
					message.error(error.response.data?.message || "请求失败")
			}
		} else if (error.request) {
			message.error("网络错误，请检查您的网络连接")
		} else {
			message.error(error.message || "请求失败")
		}

		return Promise.reject(error)
	},
)

export default request

// 封装常用请求方法
export const get = <T = any>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<T> => {
	return request.get(url, config)
}

export const post = <T = any>(
	url: string,
	data?: any,
	config?: AxiosRequestConfig,
): Promise<T> => {
	return request.post(url, data, config)
}

export const put = <T = any>(
	url: string,
	data?: any,
	config?: AxiosRequestConfig,
): Promise<T> => {
	return request.put(url, data, config)
}

export const del = <T = any>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<T> => {
	return request.delete(url, config)
}
