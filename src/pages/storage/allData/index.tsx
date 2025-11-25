import ContainerHeader from "@/components/containerHeader"
import { Card, Table, Tag, Button, Modal, Select, Input, Form } from "antd"
import { Activity, Box, Database, FileCode, FileText, Folder, GitBranch } from "lucide-react"
import { useState } from "react"

export const DATA_SOURCES = [
	{ name: 'LOT_8842_KLA_SCAN.klarf', type: 'KLARF', size: '45 MB', time: '2 hrs ago', ver: 'v1.0', icon: FileText },
	{ name: 'ETCH_TOOL_04_LOGS.csv', type: 'Sensor Log', size: '2.3 GB', time: '5 hrs ago', ver: 'v1.2', icon: FileCode },
	{ name: 'wafer_map_embeddings_v2', type: 'Vector Store', size: '12 GB', time: '1 day ago', ver: 'v2.0', icon: Database },
	{ name: 'yield_report_2024_Q3.json', type: 'JSON', size: '1.2 MB', time: '2 days ago', ver: 'v1.0', icon: FileText },
	{ name: 'sem_images_batch_22', type: 'Folder', size: '82 GB', time: '3 days ago', ver: '-', icon: Folder },
]

export default function DataIngestion() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const handleAddSource = () => {
		form.validateFields().then((values) => {
			console.log('New source:', values);
			// TODO: 添加数据源到列表
			setIsModalOpen(false);
			form.resetFields();
		}).catch((error) => {
			console.error('Validation failed:', error);
		});
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const columns = [
		{
			title: "文件/数据源名称",
			dataIndex: "name",
			key: "name",
			render: (name: string, record: typeof DATA_SOURCES[0]) => {
				const IconComponent = record.icon;
				return (
					<div className="flex items-center gap-2">
						<IconComponent className="w-4 h-4 text-slate-400" />
						<span>{name}</span>
					</div>
				);
			},
		},
		{
			title: "类型",
			dataIndex: "type",
			key: "type",
			render: (type: string) => (
				<Tag color="blue">{type}</Tag>
			),
		},
		{
			title: "大小",
			dataIndex: "size",
			key: "size",
		},
		{
			title: "更新时间",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "版本",
			dataIndex: "ver",
			key: "ver",
			render: (ver: string) => (
				<Tag color={ver === '-' ? 'default' : 'cyan'}>{ver}</Tag>
			),
		},
	]

	const data = DATA_SOURCES.map((source, index) => ({
		key: index.toString(),
		...source,
	}))

	return (
		<div className="h-full flex flex-col">
			<ContainerHeader title="数据仓库">
				<div className="flex gap-3">
					<span>Usage: 45.2 TB / 100 TB</span>
					<Button type="primary" size="small">上传数据</Button>
				</div>
			</ContainerHeader>
			<div className="p-6 space-y-6 h-full overflow-auto">
				<div className="grid grid-cols-4 gap-6 mb-8">
					<div className="glass-panel p-5 rounded-xl border border-foundry-border">
						<div className="text-xs text-slate-500 uppercase font-medium mb-2 flex items-center gap-2">
							<FileCode className="w-3 h-3" /> Raw Logs
						</div>
						<div className="text-2xl font-light text-white mb-1">24.1 TB</div>
						<div className="text-xs text-slate-500">Equipment Logs, FDC</div>
					</div>
					<div className="glass-panel p-5 rounded-xl border border-foundry-border">
						<div className="text-xs text-slate-500 uppercase font-medium mb-2 flex items-center gap-2">
							<Activity className="w-3 h-3" /> Cleaned
						</div>
						<div className="text-2xl font-light text-white mb-1">12.8 TB</div>
						<div className="text-xs text-slate-500">Structured Metrology</div>
					</div>
					<div className="glass-panel p-5 rounded-xl border border-foundry-border">
						<div className="text-xs text-slate-500 uppercase font-medium mb-2 flex items-center gap-2">
							<Box className="w-3 h-3" /> Training
						</div>
						<div className="text-2xl font-light text-white mb-1">5.4 TB</div>
						<div className="text-xs text-slate-500">Labeled Defect Sets</div>
					</div>
					<div className="glass-panel p-5 rounded-xl border border-foundry-border">
						<div className="text-xs text-slate-500 uppercase font-medium mb-2 flex items-center gap-2">
							<Database className="w-3 h-3" /> Vectors
						</div>
						<div className="text-2xl font-light text-white mb-1">540 GB</div>
						<div className="text-xs text-slate-500">Wafer Map Embeddings</div>
					</div>
				</div>

				<Card className="bg-(--foundry-surface) border border-(--foundry-border)" 	>
					<Table
						columns={columns}
						dataSource={data}
						style={{ color: "var(--foundry-text-primary)" }}
					/>
				</Card>

				<div className="mt-8">
					<h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Data Lineage (数据血缘)</h3>
					<div className="bg-foundry-surface border border-foundry-border rounded-xl p-8 h-48 flex flex-col items-center justify-center text-slate-500 gap-4 relative overflow-hidden">
						<div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foundry-primary via-transparent to-transparent"></div>
						<GitBranch className="w-12 h-12 text-foundry-primary opacity-50" />
						<div className="flex items-center gap-4 text-sm font-mono relative z-10">
							<span className="px-3 py-1 rounded border border-foundry-border bg-foundry-bg">Raw Logs</span>
							<span className="text-slate-600">→</span>
							<span className="px-3 py-1 rounded border border-foundry-border bg-foundry-bg">Cleaning (PySpark)</span>
							<span className="text-slate-600">→</span>
							<span className="px-3 py-1 rounded border border-foundry-border bg-foundry-bg text-white border-foundry-primary/50">Feature Eng.</span>
							<span className="text-slate-600">→</span>
							<span className="px-3 py-1 rounded border border-foundry-border bg-foundry-bg">Model Train</span>
						</div>
					</div>
				</div>

			</div>
			<Modal
				title="建立新连接"
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="cancel" onClick={handleModalClose}>
						取消
					</Button>,
					<Button key="submit" type="primary" onClick={handleAddSource}>
						验证并连接
					</Button>,
				]}
				width={600}
			>
				<Form
					form={form}
					layout="vertical"
					initialValues={{
						type: 'PostgreSQL',
					}}
				>
					<Form.Item
						label="连接器类型"
						name="type"
						rules={[{ required: true, message: '请选择连接器类型' }]}
					>
						<Select
							placeholder="请选择连接器类型"
							options={[
								{ value: 'Oracle', label: 'Oracle (MES)' },
								{ value: 'SQL Server', label: 'SQL Server' },
								{ value: 'StarRocks', label: 'StarRocks (Yield DB)' },
								{ value: 'FileStore', label: 'NAS / FileShare' },
								{ value: 'Kafka', label: 'Kafka Stream' },
								{ value: 'SECS/GEM', label: 'SECS/GEM Equipment' },
							]}
						/>
					</Form.Item>
					<Form.Item
						label="连接名称"
						name="name"
						rules={[{ required: true, message: '请输入连接名称' }]}
					>
						<Input placeholder="e.g., Fab 2 Etch Tools" />
					</Form.Item>
					<Form.Item
						label="Host / Endpoint"
						name="host"
						rules={[{ required: true, message: '请输入 Host / Endpoint' }]}
					>
						<Input placeholder="192.168.1.100:1521" />
					</Form.Item>
				</Form>
			</Modal>
		</div>

	)
}

