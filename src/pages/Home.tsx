import { useRequest } from "ahooks"
import { Button, Card, Space, Typography } from "antd"
import dayjs from "dayjs"
import { useUserStore } from "@/store"

const { Title, Paragraph, Text } = Typography

export default function Home() {
	const { userInfo } = useUserStore()

	// ahooks useRequest 示例
	const { data, loading, run } = useRequest(
		async () => {
			// 模拟 API 请求
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						message: "Hello from API!",
						time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
					})
				}, 1000)
			})
		},
		{
			manual: true,
		},
	)

	return (
		<div className="space-y-6">
			<Card>
				<Space direction="vertical" size="large" className="w-full">
					<Title level={2}>欢迎使用 Foundry Platform 🎉</Title>

					<Paragraph>
						这是一个基于 <Text strong>Vite + React + TypeScript</Text>{" "}
						的现代化前端项目模板
					</Paragraph>

					<div>
						<Title level={4}>技术栈：</Title>
						<ul className="list-disc list-inside space-y-2">
							<li>⚡️ Vite - 下一代前端构建工具</li>
							<li>⚛️ React 19 - UI 框架</li>
							<li>🔷 TypeScript - 类型安全</li>
							<li>🎨 Ant Design - UI 组件库</li>
							<li>🌊 Tailwind CSS - 原子化 CSS 框架</li>
							<li>📦 Zustand - 轻量级状态管理</li>
							<li>🔄 Axios - HTTP 客户端</li>
							<li>🪝 ahooks - React Hooks 库</li>
							<li>📅 dayjs - 日期处理库</li>
							<li>🔧 Biome - 代码格式化和检查工具</li>
						</ul>
					</div>

					{userInfo && (
						<Card type="inner" title="用户信息">
							<p>用户名: {userInfo.username}</p>
							<p>邮箱: {userInfo.email}</p>
						</Card>
					)}

					<Card type="inner" title="ahooks 和 dayjs 示例">
						<Space direction="vertical">
							<Text>当前时间: {dayjs().format("YYYY年MM月DD日 HH:mm:ss")}</Text>
							<Button type="primary" onClick={run} loading={loading}>
								发起请求
							</Button>
							{data && (
								<div>
									<Text type="success">响应数据: {JSON.stringify(data)}</Text>
								</div>
							)}
						</Space>
					</Card>
				</Space>
			</Card>
		</div>
	)
}
