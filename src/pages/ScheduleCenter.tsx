import { Card } from "antd"
import { Activity } from "lucide-react"

export default function ScheduleCenter() {
	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			<div className="flex items-center gap-3">
				<div
					className="w-12 h-12 rounded-lg flex items-center justify-center"
					style={{ background: "var(--foundry-primary)" }}
				>
					<Activity className="w-6 h-6 text-white" />
				</div>
				<div>
					<h1
						className="text-2xl font-bold"
						style={{ color: "var(--foundry-text-primary)" }}
					>
						调度中心
					</h1>
					<p style={{ color: "var(--foundry-text-secondary)" }}>
						算力资源调度
					</p>
				</div>
			</div>

			<Card
				title="资源调度"
				style={{
					background: "var(--foundry-surface)",
					border: `1px solid var(--foundry-border)`,
				}}
			>
				<p style={{ color: "var(--foundry-text-secondary)" }}>
					调度中心功能开发中...
				</p>
			</Card>
		</div>
	)
}

