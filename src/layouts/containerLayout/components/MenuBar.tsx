import { useNavigate, useLocation } from "react-router-dom"
import { routes } from "@/router"
import { useMemo, cloneElement } from "react"

const MenuBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // 获取当前路由的子路由（带有 meta 的），并按 group 分组
  const menuRoutes = useMemo(() => {
    // 找到当前匹配的路由配置
    const parentPath = location?.pathname.split("/").slice(1, -1)[0]
    const childRoutes = routes.find(route => route.path === '/')?.children?.find(route => route.path === parentPath)?.children
    const list = childRoutes?.filter(route => route.meta && !route.index) || []

    // 按 meta.group 进行分组
    const grouped = list.reduce((acc, route) => {
      const group = route.meta?.group || '其他'
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(route)
      return acc
    }, {} as Record<string, typeof list>)

    // 转换为期望的格式
    return Object.entries(grouped).map(([label, child]) => ({
      label,
      child
    }))
  }, [location])

  return (
    <div className="w-60 bg-foundry-surface border-r border-foundry-border p-0 flex flex-col overflow-y-auto">
      <div className="py-6">
        {menuRoutes.map((group) => (
          <div key={group.label} className="mb-6">
            <h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-2 px-5">
              {group.label}
            </h3>
            <div className="space-y-0.5">
              {group.child.map((route) => {
                if (!route.path) return null
                const fullPath = `${location.pathname.split('/').slice(0, -1).join('/')}/${route.path}`
                const active = location.pathname === fullPath
                return (
                  <div
                    key={route.path}
                    onClick={() => navigate(route.path!)}
                    className={`
                    px-5 py-2.5 text-sm cursor-pointer transition-all flex items-center gap-3
                    ${active
                        ? 'bg-foundry-accent/50 text-white border-r-2 border-foundry-highlight'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }
                  `}
                  >
                    {route.meta?.icon && cloneElement(route.meta.icon, { className: "size-4" })}
                    {route.meta?.name}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuBar
