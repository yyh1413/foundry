import {
	HomeOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"

const { Header, Sider, Content } = Layout

export default function BasicLayout() {
	const navigate = useNavigate()
	const location = useLocation()
	const { collapsed, toggleCollapsed } = useAppStore()
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const menuItems = [
		{
			key: "/",
			icon: <HomeOutlined />,
			label: "首页",
		},
		{
			key: "/about",
			icon: <InfoCircleOutlined />,
			label: "关于",
		},
	]

	return (
		<Layout className="min-h-screen">
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="h-16 flex items-center justify-center text-white text-xl font-bold">
					{collapsed ? "FP" : "Foundry Platform"}
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[location.pathname]}
					items={menuItems}
					onClick={({ key }) => navigate(key)}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={toggleCollapsed}
						className="text-base w-16 h-16"
					/>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}
