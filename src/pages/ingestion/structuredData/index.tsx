import ContainerHeader from "@/components/containerHeader"
import { Card, Table, Tag, Button, Modal, Select, Input, Form } from "antd"
import { Database, HardDrive, Plus, RefreshCw } from "lucide-react"
import { useState } from "react"

export const DATA_SOURCES = [
	{ id: 1, name: 'Fab 1 MES (生产执行系统)', type: 'Oracle', status: 'active', lastSync: '1分钟前', size: '45.2TB' },
	{ id: 2, name: 'KLA Metrology (量测数据)', type: 'FileStore', status: 'active', lastSync: '实时', size: '12.8TB' },
	{ id: 3, name: 'FDC (故障侦测分类)', type: 'PostgreSQL', status: 'active', lastSync: '5分钟前', size: '8.5TB' },
	{ id: 4, name: 'Equipment Logs (机台日志)', type: 'Kafka', status: 'active', lastSync: '实时', size: '24.5GB/h' },
	{ id: 5, name: 'Yield Management (良率管理)', type: 'StarRocks', status: 'warning', lastSync: '2小时前', size: '156GB' },
	{ id: 6, name: 'Wafer Map Vectors (晶圆图谱)', type: 'Milvus', status: 'active', lastSync: '30秒前', size: '540GB' },
];

export default function DataIngestion() {
	const [activeTab, setActiveTab] = useState('全部数据源')
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

	const handleOpenModal = (type?: string) => {
		if (type) {
			form.setFieldsValue({ type });
		}
		setIsModalOpen(true);
	};

	const columns = [
		{
			title: "数据源名称",
			dataIndex: "name",
			key: "name",
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
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (status: string) => (
				<Tag
					color={
						status === "active" ? "green" : status === "warning" ? "orange" : "default"
					}
				>
					{status === "active" ? "正常" : status === "warning" ? "警告" : "未知"}
				</Tag>
			),
		},
		{
			title: "最后同步",
			dataIndex: "lastSync",
			key: "lastSync",
		},
		{
			title: "数据量",
			dataIndex: "size",
			key: "size",
		},
	]

	const data = DATA_SOURCES.map(source => ({
		key: source.id.toString(),
		...source,
	}))

	return (
		<div className="h-full flex flex-col">
			<ContainerHeader title="数据开采">
				<div className="flex gap-3">
					<Button type="primary" size="small">导入配置</Button>
					<Button type="primary" size="small" onClick={() => handleOpenModal()}>
						<Plus className="size-4" /> 新建连接
					</Button>
				</div>
			</ContainerHeader>
			<div className="p-6 space-y-6 h-full overflow-auto">
				<div className="flex gap-6 border-b border-foundry-border mb-6">
					{['全部数据源', 'MES/ERP', '量测设备', '流式日志', '外部API'].map(tab => (
						<div
							key={tab}
							className={`pb-3 text-sm cursor-pointer transition-colors relative
								 ${activeTab === tab ? 'text-white font-medium' : 'text-slate-200 hover:text-white'}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
							{activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foundry-accent"></div>}
						</div>
					))}
				</div>
				<Card className="bg-(--foundry-surface) border border-(--foundry-border)" >
					<Table
						columns={columns}
						dataSource={data}
						style={{ color: "var(--foundry-text-primary)" }}
					/>
				</Card>

				<div>
					<h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider my-4">推荐连接器</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div
							onClick={() => handleOpenModal('Oracle')}
							className="bg-foundry-surface border border-foundry-border hover:border-foundry-accent p-5 rounded-xl cursor-pointer transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-foundry-accent/10"
						>
							<div className="text-3xl mb-3 text-blue-400 group-hover:scale-110 transition-transform duration-300">
								<Database />
							</div>
							<h4 className="text-white font-medium mb-1">MES (Oracle/SQL)</h4>
							<p className="text-xs text-slate-500 leading-relaxed">连接产线执行系统，同步 Lot 追踪与站点数据。</p>
						</div>
						<div
							onClick={() => handleOpenModal('FileStore')}
							className="bg-foundry-surface border border-foundry-border hover:border-foundry-accent p-5 rounded-xl cursor-pointer transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-foundry-accent/10"
						>
							<div className="text-3xl mb-3 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
								<HardDrive />
							</div>
							<h4 className="text-white font-medium mb-1">Metrology NAS</h4>
							<p className="text-xs text-slate-500 leading-relaxed">挂载量测设备共享存储，自动解析 KLARF/GDS 文件。</p>
						</div>
						<div
							onClick={() => handleOpenModal('Kafka')}
							className="bg-foundry-surface border border-foundry-border hover:border-foundry-accent p-5 rounded-xl cursor-pointer transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-foundry-accent/10"
						>
							<div className="text-3xl mb-3 text-green-400 group-hover:scale-110 transition-transform duration-300">
								<RefreshCw />
							</div>
							<h4 className="text-white font-medium mb-1">Sensor Stream</h4>
							<p className="text-xs text-slate-500 leading-relaxed">通过 Kafka 接入机台传感器实时数据流 (FDC)。</p>
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

