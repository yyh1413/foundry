import { APPS, type AppId } from "@/constants/tab"

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
			<div className="bg-foundry-surface/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 pb-3 pt-2 flex items-end gap-3 shadow-2xl pointer-events-auto ring-1 ring-black/20">
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
								className={`
                  w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 border shadow-lg
                  ${isActive
										? "bg-gradient-to-b from-foundry-primary to-foundry-primary-dark text-white border-white/20 shadow-[0_0_20px_rgba(24,144,255,0.6)]"
										: "bg-white/5 text-foundry-text-secondary border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20"
									}
                `}
							>
								<Icon className="w-6 h-6" />
							</div>

							{/* Tooltip 提示 */}
							<div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foundry-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-foundry-border shadow-xl uppercase tracking-wide font-medium z-50">
								{app.name}
							</div>

							{/* 已打开指示器（小圆点） */}
							<span
								className={`absolute -bottom-2 w-1 h-1 rounded-full bg-foundry-secondary transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
									}`}
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}

