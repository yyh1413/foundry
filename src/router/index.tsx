import { createBrowserRouter, Navigate } from "react-router-dom"
import BasicLayout from "@/layouts/BasicLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Home"
import DataIngestion from "@/pages/DataIngestion"
import DataStorage from "@/pages/DataStorage"
import DataRefinement from "@/pages/DataRefinement"
import ModelForge from "@/pages/ModelForge"
import ModelManagement from "@/pages/ModelManagement"
import ScheduleCenter from "@/pages/ScheduleCenter"
import FinOps from "@/pages/FinOps"
import SecurityCenter from "@/pages/SecurityCenter"

export const router = createBrowserRouter([
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
				element: <DataIngestion />,
			},
			{
				path: "storage",
				element: <DataStorage />,
			},
			{
				path: "refinement",
				element: <DataRefinement />,
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
])
