import { Card } from "antd"
import { Hammer } from "lucide-react"

export default function ModelForge() {
	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			<div className="flex items-center gap-3">
				<div
					className="w-12 h-12 rounded-lg flex items-center justify-center"
					style={{ background: "var(--foundry-primary)" }}
				>
					<Hammer className="w-6 h-6 text-white" />
				</div>
				<div>
					<h1
						className="text-2xl font-bold"
						style={{ color: "var(--foundry-text-primary)" }}
					>
						模型锻造
					</h1>
					<p style={{ color: "var(--foundry-text-secondary)" }}>
						良率预测模型训练
					</p>
				</div>
			</div>

			<Card
				title="训练任务"
				style={{
					background: "var(--foundry-surface)",
					border: `1px solid var(--foundry-border)`,
				}}
			>
				<p style={{ color: "var(--foundry-text-secondary)" }}>
					模型训练功能开发中...
				</p>
			</Card>
		</div>
	)
}

