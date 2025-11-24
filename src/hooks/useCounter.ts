import { useCallback, useState } from "react"

/**
 * 计数器 Hook 示例
 * @param initialValue 初始值
 * @returns 计数器状态和操作方法
 */
export const useCounter = (initialValue = 0) => {
	const [count, setCount] = useState(initialValue)

	const increment = useCallback(() => {
		setCount((c) => c + 1)
	}, [])

	const decrement = useCallback(() => {
		setCount((c) => c - 1)
	}, [])

	const reset = useCallback(() => {
		setCount(initialValue)
	}, [initialValue])

	const set = useCallback((value: number) => {
		setCount(value)
	}, [])

	return {
		count,
		increment,
		decrement,
		reset,
		set,
	}
}
