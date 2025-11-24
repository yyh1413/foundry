import { get, post } from "./request"

// 用户相关 API 示例
export interface LoginParams {
	username: string
	password: string
}

export interface UserInfo {
	id: number
	username: string
	email: string
	avatar?: string
}

// 登录
export const login = (data: LoginParams) => {
	return post<{ token: string; userInfo: UserInfo }>("/auth/login", data)
}

// 获取用户信息
export const getUserInfo = () => {
	return get<UserInfo>("/user/info")
}

// 退出登录
export const logout = () => {
	return post("/auth/logout")
}
