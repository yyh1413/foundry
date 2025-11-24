# Foundry Platform

一个基于 Vite + React + TypeScript 的现代化前端项目模板。

## 技术栈

- ⚡️ **Vite** - 下一代前端构建工具
- ⚛️ **React 19** - UI 框架
- 🔷 **TypeScript** - 类型安全的 JavaScript 超集
- 🎨 **Ant Design** - 企业级 UI 设计语言和组件库
- 🌊 **Tailwind CSS** - 原子化 CSS 框架
- 📦 **Zustand** - 轻量级状态管理库
- 🔄 **Axios** - 基于 Promise 的 HTTP 客户端
- 🪝 **ahooks** - React Hooks 库
- 📅 **dayjs** - 轻量级日期处理库
- 🛣️ **React Router** - React 路由管理
- 🔧 **Biome** - 快速的代码格式化和检查工具

## 项目结构

\`\`\`
src/
├── api/              # API 接口
│   ├── request.ts    # axios 实例和拦截器
│   ├── user.ts       # 用户相关 API
│   └── index.ts
├── components/       # 通用组件
├── hooks/           # 自定义 Hooks
│   ├── useCounter.ts
│   └── index.ts
├── layouts/         # 布局组件
│   └── BasicLayout.tsx
├── pages/           # 页面组件
│   ├── Home.tsx
│   ├── About.tsx
│   └── Login.tsx
├── router/          # 路由配置
│   └── index.tsx
├── store/           # 状态管理
│   ├── userStore.ts
│   ├── appStore.ts
│   └── index.ts
├── types/           # TypeScript 类型定义
│   ├── global.d.ts
│   └── env.d.ts
├── utils/           # 工具函数
│   ├── format.ts
│   ├── storage.ts
│   └── index.ts
├── index.css        # 全局样式
└── main.tsx         # 应用入口
\`\`\`

## 开始使用

### 安装依赖

\`\`\`bash
pnpm install
\`\`\`

### 开发

\`\`\`bash
pnpm dev
\`\`\`

### 构建

\`\`\`bash
pnpm build
\`\`\`

### 预览

\`\`\`bash
pnpm preview
\`\`\`

### 代码检查和格式化

\`\`\`bash
# 检查代码
pnpm lint

# 修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format
\`\`\`

## 环境变量

项目使用环境变量来管理不同环境的配置。

创建 \`.env.development\` 和 \`.env.production\` 文件（参考 \`.env.example\`）：

\`\`\`env
# 开发环境配置
VITE_APP_TITLE=Foundry Platform
VITE_API_BASE_URL=/api
VITE_APP_PORT=5173
\`\`\`

## 功能特性

- ✅ 完整的项目结构和代码组织
- ✅ 封装的 Axios 请求库，包含拦截器和错误处理
- ✅ Zustand 状态管理，支持持久化
- ✅ React Router 路由配置
- ✅ Ant Design 组件库集成，支持中文
- ✅ Tailwind CSS 原子化样式（禁用 preflight 避免与 Ant Design 冲突）
- ✅ TypeScript 类型支持和路径别名
- ✅ 环境变量配置
- ✅ 开发代理配置
- ✅ Biome 代码规范和格式化
- ✅ dayjs 日期处理，配置中文
- ✅ 常用工具函数封装
- ✅ 自定义 Hooks 示例

## 开发代理配置

在 \`vite.config.ts\` 中已配置开发代理：

\`\`\`typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',  // 修改为你的后端地址
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
\`\`\`

## 状态管理

项目使用 Zustand 进行状态管理，示例：

\`\`\`typescript
import { useUserStore } from '@/store'

function Component() {
  const { userInfo, setUserInfo } = useUserStore()
  // ...
}
\`\`\`

## API 请求

使用封装的 axios 实例：

\`\`\`typescript
import { get, post } from '@/api'

// GET 请求
const data = await get('/api/users')

// POST 请求
const result = await post('/api/login', { username, password })
\`\`\`

## License

MIT
