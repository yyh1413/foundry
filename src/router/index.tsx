import { createBrowserRouter, Navigate } from "react-router-dom"
import BasicLayout from "@/layouts/basicLayout/BasicLayout"
import ContainerLayout from "@/layouts/containerLayout/ContainerLayout"
import ProtectedRoute from "./ProtectedRoute"
import Login from "@/pages/login/Login"
import Dashboard from "@/pages/dashboard"
import StructuredData from "@/pages/ingestion/structuredData"
import UnstructuredData from "@/pages/ingestion/unstructuredData"
import AllData from "@/pages/storage/allData"
import DataFilter from "@/pages/refinement/dataFilter"

import ModelForge from "@/pages/ToDeDeveloped"
import ModelManagement from "@/pages/ToDeDeveloped"
import ScheduleCenter from "@/pages/ToDeDeveloped"
import FinOps from "@/pages/ToDeDeveloped"
import SecurityCenter from "@/pages/ToDeDeveloped"
import { Database, FileCode, RefreshCw, FileText, Filter } from "lucide-react"

export const routes = [
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<BasicLayout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "ingestion",
				key: "ingestion",
				element: <ContainerLayout />,
				children: [
					{
						index: true,
						element: <Navigate to="structured" replace />,
					},
					{
						path: "structured",
						key: "ingestion-structured",
						element: <StructuredData />,
						meta: {
							group: "数据源类型",
							name: "结构化数据",
							icon: <Database />,
						},
					},
					{
						path: "unstructured",
						key: "ingestion-unstructured",
						element: <UnstructuredData />,
						meta: {
							group: "数据源类型",
							name: "非结构化数据",
							icon: <FileCode />,
						},
					},
					{
						path: "sources",
						key: "ingestion-sources",
						element: <UnstructuredData />,
						meta: {
							group: "管理功能",
							name: "数据源管理",
							icon: <RefreshCw />,
						},
					},
				],
			},
			{
				path: "storage",
				element: <ContainerLayout />,
				children: [
					{
						index: true,
						element: <Navigate to="all-data" replace />,
					},
					{
						path: "all-data",
						element: <AllData />,
						key: "storage-all-data",
						meta: {
							group: "数据目录",
							name: "全部数据",
							icon: <FileText />,
						},
					},

				],
			},
			{
				path: "refinement",
				element: <ContainerLayout />,
				children: [
					{
						index: true,
						element: <Navigate to="data-filter" replace />,
					},
					{
						path: "data-filter",
						element: <DataFilter />,
						key: "refinement-data-filter",
						meta: {
							group: "数据目录",
							name: "数据筛选",
							icon: <Filter />,
						},
					},
				],
			},
			{
				path: "forge",
				element: <ModelForge />,
			},
			{
				path: "management",
				element: <ModelManagement />,
			},
			{
				path: "schedule",
				element: <ScheduleCenter />,
			},
			{
				path: "finops",
				element: <FinOps />,
			},
			{
				path: "security",
				element: <SecurityCenter />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]
export const router = createBrowserRouter(routes)
