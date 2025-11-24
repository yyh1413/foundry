import { Card, Descriptions, Space, Tag } from "antd"
import dayjs from "dayjs"

export default function About() {
	return (
		<div className="space-y-6">
			<Card title="关于项目">
				<Descriptions column={1} bordered>
					<Descriptions.Item label="项目名称">
						Foundry Platform
					</Descriptions.Item>
					<Descriptions.Item label="版本">1.0.0</Descriptions.Item>
					<Descriptions.Item label="创建时间">
						{dayjs().format("YYYY-MM-DD")}
					</Descriptions.Item>
					<Descriptions.Item label="技术栈">
						<Space wrap>
							<Tag color="blue">React</Tag>
							<Tag color="cyan">TypeScript</Tag>
							<Tag color="green">Vite</Tag>
							<Tag color="purple">Ant Design</Tag>
							<Tag color="orange">Tailwind CSS</Tag>
							<Tag color="red">Zustand</Tag>
							<Tag color="magenta">Axios</Tag>
							<Tag color="gold">ahooks</Tag>
							<Tag color="lime">dayjs</Tag>
						</Space>
					</Descriptions.Item>
					<Descriptions.Item label="描述">
						这是一个功能完善的现代化前端项目模板，集成了主流的开发工具和库，
						开箱即用，助力快速开发。
					</Descriptions.Item>
				</Descriptions>
			</Card>

			<Card title="功能特性">
				<ul className="list-disc list-inside space-y-2">
					<li>✅ 完整的项目结构和代码组织</li>
					<li>✅ 封装的 Axios 请求库，包含拦截器</li>
					<li>✅ Zustand 状态管理示例</li>
					<li>✅ React Router 路由配置</li>
					<li>✅ Ant Design 组件库集成</li>
					<li>✅ Tailwind CSS 原子化样式</li>
					<li>✅ TypeScript 类型支持</li>
					<li>✅ 环境变量配置</li>
					<li>✅ 开发代理配置</li>
					<li>✅ Biome 代码规范</li>
				</ul>
			</Card>
		</div>
	)
}
