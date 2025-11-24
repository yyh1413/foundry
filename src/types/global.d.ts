/**
 * 全局类型定义
 */

// API 响应基础类型
export interface ApiResponse<T = any> {
	code: number
	message: string
	data: T
	success: boolean
}

// 分页参数
export interface PaginationParams {
	page: number
	pageSize: number
}

// 分页响应
export interface PaginationResponse<T = any> {
	list: T[]
	total: number
	page: number
	pageSize: number
}

// 通用记录类型
export type RecordType = Record<string, any>
