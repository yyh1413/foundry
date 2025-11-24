import { Card, Col, Row, Statistic, Progress } from "antd"
import { Activity, Database, Hammer, ShieldCheck, TrendingUp } from "lucide-react"
import dayjs from "dayjs"
import { useUserStore } from "@/store"

export default function Dashboard() {
	const { userInfo } = useUserStore()

	const stats = [
		{
			title: "数据总量",
			value: 1283,
			unit: "GB",
			icon: Database,
			color: "var(--foundry-primary)",
		},
		{
			title: "训练任务",
			value: 24,
			unit: "个",
			icon: Hammer,
			color: "var(--foundry-secondary)",
		},
		{
			title: "模型部署",
			value: 12,
			unit: "个",
			icon: Activity,
			color: "var(--foundry-success)",
		},
		{
			title: "安全事件",
			value: 0,
			unit: "次",
			icon: ShieldCheck,
			color: "var(--foundry-warning)",
		},
	]

	return (
		<div className="p-6 space-y-6 h-full overflow-auto">
			{/* 欢迎信息 */}
			<div
				className="p-6 rounded-lg"
				style={{
					background: "var(--foundry-surface)",
					border: `1px solid var(--foundry-border)`,
				}}
			>
				<h1
					className="text-2xl font-bold mb-2"
					style={{ color: "var(--foundry-text-primary)" }}
				>
					欢迎回来，{userInfo?.username || "Engineer"}！
				</h1>
				<p style={{ color: "var(--foundry-text-secondary)" }}>
					{dayjs().format("YYYY年MM月DD日 HH:mm")} | 系统运行正常
				</p>
			</div>

			{/* 统计卡片 */}
			<Row gutter={[16, 16]}>
				{stats.map((stat, index) => {
					const Icon = stat.icon
					return (
						<Col xs={24} sm={12} lg={6} key={index}>
							<Card
								style={{
									background: "var(--foundry-surface)",
									border: `1px solid var(--foundry-border)`,
								}}
							>
								<div className="flex items-center justify-between">
									<div>
										<p
											className="text-sm mb-2"
											style={{ color: "var(--foundry-text-secondary)" }}
										>
											{stat.title}
										</p>
										<p
											className="text-3xl font-bold"
											style={{ color: "var(--foundry-text-primary)" }}
										>
											{stat.value}
											<span className="text-sm ml-1">{stat.unit}</span>
										</p>
									</div>
									<div
										className="w-12 h-12 rounded-lg flex items-center justify-center"
										style={{ background: `${stat.color}20` }}
									>
										<Icon className="w-6 h-6" style={{ color: stat.color }} />
									</div>
								</div>
							</Card>
						</Col>
					)
				})}
			</Row>

			{/* 系统状态 */}
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card
						title="系统资源使用"
						style={{
							background: "var(--foundry-surface)",
							border: `1px solid var(--foundry-border)`,
							color: "var(--foundry-text-primary)",
						}}
					>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-2">
									<span style={{ color: "var(--foundry-text-secondary)" }}>
										CPU 使用率
									</span>
									<span style={{ color: "var(--foundry-text-primary)" }}>
										45%
									</span>
								</div>
								<Progress
									percent={45}
									strokeColor="var(--foundry-primary)"
									trailColor="var(--foundry-bg)"
								/>
							</div>
							<div>
								<div className="flex justify-between mb-2">
									<span style={{ color: "var(--foundry-text-secondary)" }}>
										内存使用率
									</span>
									<span style={{ color: "var(--foundry-text-primary)" }}>
										68%
									</span>
								</div>
								<Progress
									percent={68}
									strokeColor="var(--foundry-secondary)"
									trailColor="var(--foundry-bg)"
								/>
							</div>
							<div>
								<div className="flex justify-between mb-2">
									<span style={{ color: "var(--foundry-text-secondary)" }}>
										GPU 使用率
									</span>
									<span style={{ color: "var(--foundry-text-primary)" }}>
										82%
									</span>
								</div>
								<Progress
									percent={82}
									strokeColor="var(--foundry-warning)"
									trailColor="var(--foundry-bg)"
								/>
							</div>
						</div>
					</Card>
				</Col>

				<Col xs={24} lg={12}>
					<Card
						title="最近活动"
						style={{
							background: "var(--foundry-surface)",
							border: `1px solid var(--foundry-border)`,
							color: "var(--foundry-text-primary)",
						}}
					>
						<div className="space-y-3">
							{[
								{ time: "10:24", content: "模型训练任务 #1283 已完成", type: "success" },
								{ time: "09:45", content: "数据接入任务正在运行", type: "info" },
								{ time: "09:12", content: "系统备份已完成", type: "success" },
								{ time: "08:30", content: "安全扫描完成，未发现异常", type: "success" },
							].map((activity, index) => (
								<div
									key={index}
									className="flex items-start gap-3 p-3 rounded"
									style={{ background: "var(--foundry-bg)" }}
								>
									<div
										className="w-2 h-2 rounded-full mt-2"
										style={{
											background:
												activity.type === "success"
													? "var(--foundry-success)"
													: "var(--foundry-info)",
										}}
									/>
									<div className="flex-1">
										<p style={{ color: "var(--foundry-text-primary)" }}>
											{activity.content}
										</p>
										<p
											className="text-xs mt-1"
											style={{ color: "var(--foundry-text-muted)" }}
										>
											{activity.time}
										</p>
									</div>
								</div>
							))}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
