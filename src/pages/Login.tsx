import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import type { LoginParams } from "@/api/user"
import { useUserStore } from "@/store"

export default function Login() {
	const navigate = useNavigate()
	const { setToken, setUserInfo } = useUserStore()

	const onFinish = async (values: LoginParams) => {
		try {
			// 这里应该调用实际的登录 API
			// const res = await login(values)

			// 模拟登录成功
			const mockToken = `mock-token-${Date.now()}`
			const mockUserInfo = {
				id: 1,
				username: values.username,
				email: `${values.username}@example.com`,
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
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
			<Card className="w-96 shadow-lg">
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold mb-2">Foundry Platform</h1>
					<p className="text-gray-500">欢迎登录</p>
				</div>

				<Form name="login" onFinish={onFinish} autoComplete="off" size="large">
					<Form.Item
						name="username"
						rules={[{ required: true, message: "请输入用户名!" }]}
					>
						<Input prefix={<UserOutlined />} placeholder="用户名" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: "请输入密码!" }]}
					>
						<Input.Password prefix={<LockOutlined />} placeholder="密码" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="w-full">
							登录
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}
