import { Bell, LogOut, User, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { APPS, type AppId } from "@/constants"
import { useUserStore } from "@/store"

interface TopNavBarProps {
	openApps: AppId[]
	activeAppId: AppId
	onAppClick: (id: AppId) => void
	onAppClose: (e: React.MouseEvent, id: AppId) => void
	onDashboardClick: () => void
	onLogout: () => void
}

export default function TopNavBar({
	openApps,
	activeAppId,
	onAppClick,
	onAppClose,
	onDashboardClick,
	onLogout,
}: TopNavBarProps) {
	const navigate = useNavigate()
	const { userInfo } = useUserStore()

	return (
		<nav className="h-10 bg-foundry-surface/95 backdrop-blur-md border-b border-foundry-border flex items-center justify-between px-4 z-50 select-none shadow-md shrink-0">
			<div className="flex items-center gap-4">
				{/* Logo */}
				<div
					className="font-bold tracking-wider cursor-pointer hover:text-foundry-secondary transition-colors text-sm flex items-center gap-2 text-foundry-primary"
					onClick={onDashboardClick}
				>
					<div className="w-2 h-2 rounded-full animate-pulse bg-foundry-secondary" />
					FOUNDRY
					<span className="text-[10px] font-mono opacity-60 text-foundry-text-secondary">
						v2.0
					</span>
				</div>

				<div className="h-4 w-[1px] mx-2 bg-foundry-border" />

				{/* 标签栏 */}
				<div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[60vw]">
					{openApps.map((id) => {
						const app = APPS.find((a) => a.id === id)
						if (!app) return null

						const isActive = activeAppId === id
						const Icon = app.icon

						return (
							<div
								key={id}
								onClick={() => onAppClick(id)}
								className={`
                  group flex items-center gap-2 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-all border
                  ${
										isActive
											? "bg-foundry-primary/20 border-foundry-primary/50 text-white shadow-[0_0_10px_rgba(24,144,255,0.2)]"
											: "bg-white/5 border-transparent text-foundry-text-secondary hover:bg-white/10 hover:text-white"
									}
                `}
							>
								<Icon className="w-3.5 h-3.5 opacity-70" />
								<span className="whitespace-nowrap">{app.name}</span>
								{id !== "dashboard" && (
									<div
										onClick={(e) => onAppClose(e, id)}
										className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/20 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<X className="w-2.5 h-2.5" />
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>

			{/* 右侧工具栏 */}
			<div className="flex items-center gap-3 text-[11px] text-foundry-text-secondary">
				{/* 通知 */}
				<div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer transition-colors relative">
					<Bell className="w-3.5 h-3.5" />
					<span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-foundry-secondary" />
				</div>

				{/* 用户信息 */}
				<div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer transition-colors">
					<User className="w-3.5 h-3.5" />
					<span>{userInfo?.username || "Engineer"}</span>
				</div>

				{/* 退出登录 */}
				<div
					className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors hover:bg-foundry-error/10 hover:text-foundry-error"
					onClick={onLogout}
				>
					<LogOut className="w-3.5 h-3.5" />
				</div>
			</div>
		</nav>
	)
}

