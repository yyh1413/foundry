import "react-router-dom"

declare module "react-router-dom" {
	interface IndexRouteObject {
		meta?: {
			name?: string
			icon?: React.ReactNode
			[key: string]: any
		}
	}

	interface NonIndexRouteObject {
		meta?: {
			name?: string
			icon?: React.ReactNode
			[key: string]: any
		}
	}
}

