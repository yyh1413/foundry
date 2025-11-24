import { Card, Statistic, Row, Col } from "antd"
import { HardDrive, FolderOpen, Database } from "lucide-react"

export default function DataStorage() {
	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			<div className="flex items-center gap-3">
				<div
					className="w-12 h-12 rounded-lg flex items-center justify-center"
					style={{ background: "var(--foundry-primary)" }}
				>
					<HardDrive className="w-6 h-6 text-white" />
				</div>
				<div>
					<h1
						className="text-2xl font-bold"
						style={{ color: "var(--foundry-text-primary)" }}
					>
						数据贮存
					</h1>
					<p style={{ color: "var(--foundry-text-secondary)" }}>
						晶圆图谱与制程数据
					</p>
				</div>
			</div>

			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Card
						style={{
							background: "var(--foundry-surface)",
							border: `1px solid var(--foundry-border)`,
						}}
					>
						<Statistic
							title="总存储容量"
							value={2048}
							suffix="GB"
							valueStyle={{ color: "var(--foundry-text-primary)" }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						style={{
							background: "var(--foundry-surface)",
							border: `1px solid var(--foundry-border)`,
						}}
					>
						<Statistic
							title="已使用"
							value={1283}
							suffix="GB"
							valueStyle={{ color: "var(--foundry-secondary)" }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						style={{
							background: "var(--foundry-surface)",
							border: `1px solid var(--foundry-border)`,
						}}
					>
						<Statistic
							title="文件数量"
							value={45620}
							valueStyle={{ color: "var(--foundry-success)" }}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

