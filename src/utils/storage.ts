/**
 * localStorage 封装
 */
export const storage = {
	get<T = any>(key: string): T | null {
		const value = localStorage.getItem(key)
		if (!value) return null
		try {
			return JSON.parse(value)
		} catch {
			return value as T
		}
	},

	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value))
	},

	remove(key: string) {
		localStorage.removeItem(key)
	},

	clear() {
		localStorage.clear()
	},
}

/**
 * sessionStorage 封装
 */
export const sessionStorage = {
	get<T = any>(key: string): T | null {
		const value = window.sessionStorage.getItem(key)
		if (!value) return null
		try {
			return JSON.parse(value)
		} catch {
			return value as T
		}
	},

	set(key: string, value: any) {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	},

	remove(key: string) {
		window.sessionStorage.removeItem(key)
	},

	clear() {
		window.sessionStorage.clear()
	},
}
