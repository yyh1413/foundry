import { Outlet } from "react-router-dom"
import MenuBar from "@/layouts/containerLayout/components/MenuBar"

const ModuleLayout = () => {
  return (
    <div className="flex h-full">
      <MenuBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default ModuleLayout