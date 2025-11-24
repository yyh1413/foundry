import { create } from "zustand"

interface AppState {
	collapsed: boolean
	theme: "light" | "dark"
	setCollapsed: (collapsed: boolean) => void
	toggleCollapsed: () => void
	setTheme: (theme: "light" | "dark") => void
}

export const useAppStore = create<AppState>((set) => ({
	collapsed: false,
	theme: "light",
	setCollapsed: (collapsed) => set({ collapsed }),
	toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
	setTheme: (theme) => set({ theme }),
}))
