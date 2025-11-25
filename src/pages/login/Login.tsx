import { Button, Card, Form, Input, message } from "antd"
import { Lock, UserIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/store"
import type { LoginParams } from "@/api/user"

export default function Login() {
	const navigate = useNavigate()
	const { setToken, setUserInfo } = useUserStore()
	const [form] = Form.useForm()

	const onFinish = async (values: LoginParams) => {
		try {
			// 这里应该调用实际的登录 API
			// const res = await login(values)

			// 模拟登录成功
			const mockToken = `mock-token-${Date.now()}`
			const mockUserInfo = {
				id: 1,
				username: values.username,
				email: `${values.username}@foundry.com`,
			}

			setToken(mockToken)
			setUserInfo(mockUserInfo)
			message.success("登录成功！")
			navigate("/")
		} catch {
			message.error("登录失败，请重试")
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-foundry-bg">
			{/* 背景装饰 */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-10 bg-foundry-primary" />
				<div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-10 bg-foundry-secondary" />
			</div>

			{/* 登录卡片 */}
			<Card className="w-96 shadow-2xl relative z-10 bg-foundry-surface! border-foundry-border!" 
			>

				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-2 mb-2">
						<div className="w-3 h-3 rounded-full animate-pulse bg-foundry-secondary" />
						<h1 className="text-3xl font-bold tracking-wider text-foundry-primary">
							FOUNDRY
						</h1>
					</div>
					<p className="text-foundry-text-secondary">数据铸造平台</p>
					<div className="size-10 bg-foundry-surface rounded-full"></div>
				</div>

				<Form
					form={form}
					name="login"
					onFinish={onFinish}
					autoComplete="off"
					size="large"
					layout="vertical"
					initialValues={{
						username: "admin",
						password: "123456",
					}}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: "请输入用户名!" }]}
					>
						<Input
							prefix={<UserIcon className="w-4 h-4 opacity-50" />}
							placeholder="用户名"
							className="bg-foundry-bg border-foundry-border text-foundry-text-primary"
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: "请输入密码!" }]}
					>
						<Input.Password
							prefix={<Lock className="w-4 h-4 opacity-50" />}
							placeholder="密码"
							className="bg-foundry-bg border-foundry-border text-foundry-text-primary"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="w-full h-[42px] bg-foundry-primary border-foundry-primary"
						>
							登录
						</Button>
					</Form.Item>
				</Form>

				<div className="text-center text-xs mt-4 text-foundry-text-muted">
					<p>提示：输入任意用户名和密码即可登录</p>
				</div>
			</Card>
		</div>
	)
}
