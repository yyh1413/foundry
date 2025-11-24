import {
	Activity,
	Coins,
	FlaskConical,
	Hammer,
	HardDrive,
	LayoutGrid,
	Pickaxe,
	ShieldCheck,
	Target,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type AppId =
	| "dashboard"
	| "ingestion"
	| "storage"
	| "refinement"
	| "forge"
	| "management"
	| "schedule"
	| "finops"
	| "security"

export interface Application {
	id: AppId
	name: string
	icon: LucideIcon
	description: string
	path: string
}

export const APPS: Application[] = [
	{
		id: "dashboard",
		name: "仪表盘",
		icon: LayoutGrid,
		description: "系统总览",
		path: "/",
	},
	{
		id: "ingestion",
		name: "数据开采",
		icon: Pickaxe,
		description: "MES/设备日志接入",
		path: "/ingestion",
	},
	{
		id: "storage",
		name: "数据贮存",
		icon: HardDrive,
		description: "晶圆图谱与制程数据",
		path: "/storage",
	},
	{
		id: "refinement",
		name: "数据精炼",
		icon: FlaskConical,
		description: "缺陷标注与清洗",
		path: "/refinement",
	},
	{
		id: "forge",
		name: "模型锻造",
		icon: Hammer,
		description: "良率预测模型训练",
		path: "/forge",
	},
	{
		id: "management",
		name: "模型管理",
		icon: Target,
		description: "产线模型部署",
		path: "/management",
	},
	{
		id: "schedule",
		name: "调度中心",
		icon: Activity,
		description: "算力资源调度",
		path: "/schedule",
	},
	{
		id: "finops",
		name: "FinOps",
		icon: Coins,
		description: "训练成本分析",
		path: "/finops",
	},
	{
		id: "security",
		name: "安全中心",
		icon: ShieldCheck,
		description: "IP保护与审计",
		path: "/security",
	},
]

// 根据路径查找应用
export const getAppByPath = (path: string): Application | undefined => {
	return APPS.find((app) => app.path === path)
}

// 根据ID查找应用
export const getAppById = (id: AppId): Application | undefined => {
	return APPS.find((app) => app.id === id)
}

