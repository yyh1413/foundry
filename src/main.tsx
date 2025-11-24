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
				colorPrimary: "var(--foundry-primary)",
				colorInfo: "var(--foundry-info)",
				colorSuccess: "var(--foundry-success)",
				colorWarning: "var(--foundry-warning)",
				colorError: "var(--foundry-error)",
				colorBgBase: "var(--foundry-bg)",
				colorBgContainer: "var(--foundry-bg)",
				colorBorder: "var(--foundry-border)",
				colorText: "var(--foundry-text-primary)",
				colorTextSecondary: "var(--foundry-text-secondary)",
			},
		}}
	>
		<RouterProvider router={router} />
	</ConfigProvider>
)
