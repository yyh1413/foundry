import { useNavigate, useLocation } from "react-router-dom"
import { Database, FileCode, RefreshCw, Cloud, Server, Box } from "lucide-react"

const MenuBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 数据源类型配置
  const dataSourceTypes = [
    { label: '结构化数据', icon: Database, path: '/ingestion/structured' },
    { label: '非结构化数据', icon: FileCode, path: '/ingestion/unstructured' },
    { label: '流式数据', icon: RefreshCw, path: '/ingestion/streaming' },
    { label: '云存储', icon: Cloud, path: '/ingestion/cloud' },
    { label: 'API接口', icon: Server, path: '/ingestion/api' },
  ]

  // 管理功能配置
  const managementFunctions = [
    { label: '数据源管理', path: '/ingestion/sources' },
    { label: '连接配置', path: '/ingestion/connections' },
    { label: '采集任务', path: '/ingestion/tasks' },
    { label: '预清洗规则', path: '/ingestion/rules' },
    { label: '数据探索', path: '/ingestion/explore' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="w-60 bg-foundry-surface border-r border-foundry-border p-0 flex flex-col overflow-y-auto">
      <div className="py-6">
        <div className="mb-6">
          <h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-2 px-5">
            数据源类型
          </h3>
          <div className="space-y-0.5">
            {dataSourceTypes.map((item) => {
              const active = isActive(item.path)
              return (
                <div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    px-5 py-2.5 text-sm cursor-pointer transition-all flex items-center gap-3
                    ${active
                      ? 'bg-foundry-accent text-white border-r-2 border-foundry-highlight'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-2 px-5">
            管理功能
          </h3>
          <div className="space-y-0.5">
            {managementFunctions.map((item) => {
              const active = isActive(item.path)
              return (
                <div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    px-5 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-3
                    ${active
                      ? 'bg-foundry-accent text-white border-r-2 border-foundry-highlight'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <Box className="w-4 h-4 opacity-70" />
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuBar
