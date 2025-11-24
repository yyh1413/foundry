import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserInfo } from "@/api/user"

interface UserState {
	token: string | null
	userInfo: UserInfo | null
	setToken: (token: string) => void
	setUserInfo: (userInfo: UserInfo) => void
	clearUser: () => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			token: null,
			userInfo: null,
			setToken: (token) => {
				set({ token })
				localStorage.setItem("token", token)
			},
			setUserInfo: (userInfo) => set({ userInfo }),
			clearUser: () => {
				set({ token: null, userInfo: null })
				localStorage.removeItem("token")
			},
		}),
		{
			name: "user-storage",
		},
	),
)
