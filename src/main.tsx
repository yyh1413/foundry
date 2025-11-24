import { ConfigProvider } from "antd"
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
	<ConfigProvider locale={zhCN}>
		<RouterProvider router={router} />
	</ConfigProvider>
)
