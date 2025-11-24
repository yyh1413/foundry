import { Card } from "antd"
import { ShieldCheck } from "lucide-react"

export default function SecurityCenter() {
	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			<div className="flex items-center gap-3">
				<div
					className="w-12 h-12 rounded-lg flex items-center justify-center"
					style={{ background: "var(--foundry-primary)" }}
				>
					<ShieldCheck className="w-6 h-6 text-white" />
				</div>
				<div>
					<h1
						className="text-2xl font-bold"
						style={{ color: "var(--foundry-text-primary)" }}
					>
						安全中心
					</h1>
					<p style={{ color: "var(--foundry-text-secondary)" }}>
						IP保护与审计
					</p>
				</div>
			</div>

			<Card
				title="安全监控"
				style={{
					background: "var(--foundry-surface)",
					border: `1px solid var(--foundry-border)`,
				}}
			>
				<p style={{ color: "var(--foundry-text-secondary)" }}>
					安全中心功能开发中...
				</p>
			</Card>
		</div>
	)
}

