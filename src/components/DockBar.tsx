import { APPS, type AppId } from "@/constants"

interface DockBarProps {
	openApps: AppId[]
	activeAppId: AppId
	onAppClick: (id: AppId) => void
}

export default function DockBar({
	openApps,
	activeAppId,
	onAppClick,
}: DockBarProps) {
	return (
		<div className="h-[88px] z-50 flex items-center justify-center w-full pb-4 pointer-events-none">
			<div
				className="backdrop-blur-2xl border rounded-2xl px-4 pb-3 pt-2 flex items-end gap-3 shadow-2xl pointer-events-auto ring-1 ring-black/20"
				style={{
					background: "rgba(30, 41, 59, 0.8)",
					borderColor: "rgba(255, 255, 255, 0.1)",
				}}
			>
				{/* 所有应用图标 */}
				{APPS.map((app) => {
					const isActive = activeAppId === app.id
					const isOpen = openApps.includes(app.id)
					const Icon = app.icon

					return (
						<button
							key={app.id}
							onClick={() => onAppClick(app.id)}
							className={`
                group relative flex flex-col items-center justify-end transition-all duration-300 ease-out
                ${isActive ? "-translate-y-3 scale-110" : "hover:-translate-y-2 hover:scale-110"}
              `}
						>
							{/* 图标容器 */}
							<div
								className="w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 border shadow-lg"
								style={{
									background: isActive
										? "linear-gradient(to bottom, var(--foundry-primary), var(--foundry-primary-dark))"
										: "rgba(255, 255, 255, 0.05)",
									borderColor: isActive
										? "rgba(255, 255, 255, 0.2)"
										: "rgba(255, 255, 255, 0.05)",
									color: isActive
										? "white"
										: "var(--foundry-text-secondary)",
									boxShadow: isActive
										? "0 0 15px rgba(26, 84, 144, 0.5)"
										: "0 4px 6px rgba(0, 0, 0, 0.1)",
								}}
								onMouseEnter={(e) => {
									if (!isActive) {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
										e.currentTarget.style.color = "white"
										e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
									}
								}}
								onMouseLeave={(e) => {
									if (!isActive) {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
										e.currentTarget.style.color = "var(--foundry-text-secondary)"
										e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)"
									}
								}}
							>
								<Icon className="w-6 h-6" />
							</div>

							{/* Tooltip 提示 */}
							<div
								className="absolute -top-10 left-1/2 -translate-x-1/2 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border shadow-xl uppercase tracking-wide font-medium z-50"
								style={{
									background: "var(--foundry-surface)",
									borderColor: "var(--foundry-border)",
								}}
							>
								{app.name}
							</div>

							{/* 已打开指示器（小圆点） */}
							<span
								className={`absolute -bottom-2 w-1 h-1 rounded-full transition-opacity duration-300 ${
									isOpen ? "opacity-100" : "opacity-0"
								}`}
								style={{ background: "var(--foundry-secondary)" }}
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}

