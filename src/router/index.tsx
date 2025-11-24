import { createBrowserRouter } from "react-router-dom"
import BasicLayout from "@/layouts/BasicLayout"
import About from "@/pages/About"
import Home from "@/pages/Home"
import Login from "@/pages/Login"

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: <BasicLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "about",
				element: <About />,
			},
		],
	},
])
