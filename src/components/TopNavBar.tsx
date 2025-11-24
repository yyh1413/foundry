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
		<nav
			className="h-10 backdrop-blur-md border-b flex items-center justify-between px-4 z-50 select-none shadow-md shrink-0"
			style={{
				background: "rgba(30, 41, 59, 0.95)",
				borderColor: "var(--foundry-border)",
			}}
		>
			<div className="flex items-center gap-4">
				{/* Logo */}
				<div
					className="font-bold tracking-wider cursor-pointer hover:text-secondary transition-colors text-sm flex items-center gap-2"
					onClick={onDashboardClick}
					style={{ color: "var(--foundry-primary)" }}
				>
					<div
						className="w-2 h-2 rounded-full animate-pulse"
						style={{ background: "var(--foundry-secondary)" }}
					/>
					FOUNDRY
					<span
						className="text-[10px] font-mono opacity-60"
						style={{ color: "var(--foundry-text-secondary)" }}
					>
						v2.0
					</span>
				</div>

				<div
					className="h-4 w-[1px] mx-2"
					style={{ background: "var(--foundry-border)" }}
				/>

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
											? "text-white shadow-[0_0_10px_rgba(26,84,144,0.2)]"
											: "border-transparent hover:text-white"
									}
                `}
								style={{
									background: isActive
										? "rgba(26, 84, 144, 0.2)"
										: "rgba(255, 255, 255, 0.05)",
									borderColor: isActive
										? "rgba(26, 84, 144, 0.5)"
										: "transparent",
									color: isActive
										? "var(--foundry-text-primary)"
										: "var(--foundry-text-secondary)",
								}}
								onMouseEnter={(e) => {
									if (!isActive) {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
									}
								}}
								onMouseLeave={(e) => {
									if (!isActive) {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
									}
								}}
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
			<div
				className="flex items-center gap-3 text-[11px]"
				style={{ color: "var(--foundry-text-secondary)" }}
			>
				{/* 通知 */}
				<div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer transition-colors relative">
					<Bell className="w-3.5 h-3.5" />
					<span
						className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full"
						style={{ background: "var(--foundry-secondary)" }}
					/>
				</div>

				{/* 用户信息 */}
				<div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer transition-colors">
					<User className="w-3.5 h-3.5" />
					<span>{userInfo?.username || "Engineer"}</span>
				</div>

				{/* 退出登录 */}
				<div
					className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors"
					onClick={onLogout}
					style={{
						"&:hover": {
							background: "rgba(239, 68, 68, 0.1)",
							color: "#ef4444",
						},
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
						e.currentTarget.style.color = "#ef4444"
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = "transparent"
						e.currentTarget.style.color = "var(--foundry-text-secondary)"
					}}
				>
					<LogOut className="w-3.5 h-3.5" />
				</div>
			</div>
		</nav>
	)
}

