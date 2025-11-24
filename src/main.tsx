import { ConfigProvider, theme } from "antd"
import zhCN from "antd/locale/zh_CN"
import dayjs from "dayjs"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "dayjs/locale/zh-cn"
import "./index.css"
import { router } from "./router"

// 配置 dayjs 使用中文
dayjs.locale("zh-cn")

createRoot(document.getElementById("root")!).render(
	<ConfigProvider
		locale={zhCN}
		theme={{
			algorithm: theme.darkAlgorithm,
			token: {
				colorPrimary: "#1890ff",
				colorInfo: "#1890ff",
				colorSuccess: "#52c41a",
				colorWarning: "#faad14",
				colorError: "#ff4d4f",
				colorBgBase: "#141414",
				colorBgContainer: "#1f1f1f",
				colorBgElevated: "#252525",
				colorBorder: "#303030",
				colorBorderSecondary: "#262626",
				colorText: "#ffffff",
				colorTextSecondary: "#a0a0a0",
				colorTextTertiary: "#707070",
				borderRadius: 8,
			},
		}}
	>
		<RouterProvider router={router} />
	</ConfigProvider>
)
