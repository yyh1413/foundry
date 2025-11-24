import { Card } from "antd"
import { Coins } from "lucide-react"

export default function FinOps() {
	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			<div className="flex items-center gap-3">
				<div
					className="w-12 h-12 rounded-lg flex items-center justify-center"
					style={{ background: "var(--foundry-primary)" }}
				>
					<Coins className="w-6 h-6 text-white" />
				</div>
				<div>
					<h1
						className="text-2xl font-bold"
						style={{ color: "var(--foundry-text-primary)" }}
					>
						FinOps
					</h1>
					<p style={{ color: "var(--foundry-text-secondary)" }}>
						训练成本分析
					</p>
				</div>
			</div>

			<Card
				title="成本分析"
				style={{
					background: "var(--foundry-surface)",
					border: `1px solid var(--foundry-border)`,
				}}
			>
				<p style={{ color: "var(--foundry-text-secondary)" }}>
					成本分析功能开发中...
				</p>
			</Card>
		</div>
	)
}

