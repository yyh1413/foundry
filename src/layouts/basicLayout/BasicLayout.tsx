import { useState, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { APPS, getAppByPath, type AppId } from "@/constants"
import TopNavBar from "@/layouts/basicLayout/components/TopNavBar"
import DockBar from "@/layouts/basicLayout/components/DockBar"
import { useUserStore } from "@/store"

export default function BasicLayout() {
	const navigate = useNavigate()
	const location = useLocation()
	const { clearUser } = useUserStore()

	// 窗口管理状态
	const [openApps, setOpenApps] = useState<AppId[]>(["dashboard"])
	const [activeAppId, setActiveAppId] = useState<AppId>("dashboard")

	// 根据路由更新活动应用
	useEffect(() => {
		const app = getAppByPath(location.pathname)
		if (app) {
			setActiveAppId(app.id)
			// 如果应用未打开，则打开它
			if (!openApps.includes(app.id)) {
				setOpenApps([...openApps, app.id])
			}
		}
	}, [location.pathname])

	// 打开应用
	const openApp = (id: AppId) => {
		const app = APPS.find((a) => a.id === id)
		if (!app) return

		// 如果应用未打开，添加到已打开列表
		if (!openApps.includes(id)) {
			setOpenApps([...openApps, id])
		}

		// 设置为活动应用并导航
		setActiveAppId(id)
		navigate(app.path)
	}

	// 关闭应用
	const closeApp = (e: React.MouseEvent, id: AppId) => {
		e.stopPropagation()

		// Dashboard 不能关闭
		if (id === "dashboard") return

		const newApps = openApps.filter((appId) => appId !== id)
		setOpenApps(newApps)

		// 如果关闭的是当前活动应用，切换到最后一个应用
		if (activeAppId === id) {
			const nextApp = newApps[newApps.length - 1] || "dashboard"
			const app = APPS.find((a) => a.id === nextApp)
			if (app) {
				setActiveAppId(nextApp)
				navigate(app.path)
			}
		}

		// 确保至少有 dashboard 打开
		if (newApps.length === 0) {
			setOpenApps(["dashboard"])
			setActiveAppId("dashboard")
			navigate("/")
		}
	}

	// 切换应用
	const handleAppClick = (id: AppId) => {
		const app = APPS.find((a) => a.id === id)
		if (app) {
			setActiveAppId(id)
			navigate(app.path)
		}
	}

	// 点击 Dashboard
	const handleDashboardClick = () => {
		openApp("dashboard")
	}

	// 退出登录
	const handleLogout = () => {
		clearUser()
		navigate("/login")
	}

	return (
		<div className="flex flex-col h-screen w-full relative overflow-hidden bg-foundry-bg text-foundry-text-primary">
			{/* 顶部导航栏 */}
			<TopNavBar
				openApps={openApps}
				activeAppId={activeAppId}
				onAppClick={handleAppClick}
				onAppClose={closeApp}
				onDashboardClick={handleDashboardClick}
				onLogout={handleLogout}
			/>

			{/* 主工作区 */}
			<main className="relative flex-1 z-10 p-2 overflow-hidden">
				<div className="w-full h-full animate-in fade-in zoom-in-[0.99] duration-200">
					<div className="h-full w-full glass-panel rounded-xl flex flex-col overflow-hidden shadow-2xl border border-foundry-border">
						<Outlet />
					</div>
				</div>
			</main>

			{/* 底部 Dock 栏 */}
			<DockBar openApps={openApps} activeAppId={activeAppId} onAppClick={openApp} />
		</div>
	)
}
