import { Card, Table, Tag, Button } from "antd"
import { Pickaxe, Plus } from "lucide-react"

export default function DataIngestion() {
	const columns = [
		{
			title: "任务名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "数据源",
			dataIndex: "source",
			key: "source",
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (status: string) => (
				<Tag
					color={
						status === "running" ? "blue" : status === "success" ? "green" : "default"
					}
				>
					{status === "running" ? "运行中" : status === "success" ? "已完成" : "待开始"}
				</Tag>
			),
		},
		{
			title: "数据量",
			dataIndex: "size",
			key: "size",
		},
	]

	const data = [
		{
			key: "1",
			name: "MES数据接入-产线A",
			source: "MES System",
			status: "running",
			size: "128 GB",
		},
		{
			key: "2",
			name: "设备日志采集-产线B",
			source: "Device Logger",
			status: "success",
			size: "64 GB",
		},
	]

	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div
						className="w-12 h-12 rounded-lg flex items-center justify-center"
						style={{ background: "var(--foundry-primary)" }}
					>
						<Pickaxe className="w-6 h-6 text-white" />
					</div>
					<div>
						<h1
							className="text-2xl font-bold"
							style={{ color: "var(--foundry-text-primary)" }}
						>
							数据开采
						</h1>
						<p style={{ color: "var(--foundry-text-secondary)" }}>
							MES/设备日志接入
						</p>
					</div>
				</div>
				<Button
					type="primary"
					icon={<Plus className="w-4 h-4" />}
					style={{ background: "var(--foundry-primary)" }}
				>
					新建接入任务
				</Button>
			</div>

			<Card
				title="接入任务列表"
				style={{
					background: "var(--foundry-surface)",
					border: `1px solid var(--foundry-border)`,
				}}
			>
				<Table
					columns={columns}
					dataSource={data}
					style={{ color: "var(--foundry-text-primary)" }}
				/>
			</Card>
		</div>
	)
}

