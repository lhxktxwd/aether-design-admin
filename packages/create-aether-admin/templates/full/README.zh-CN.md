# **PROJECT_NAME**

[English](./README.md)

由 `create-aether-admin` 生成的 Aether Design Admin 项目模板。

在交互式终端里，CLI 会自动进入引导流程，可以选择需要的可选能力，不需要记一长串参数。

需要 Node `^20.19.0 || >=22.12.0`。

## 常用命令

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

## 包含内容

- Vue 3, TypeScript, Vite
- Element Plus + Aether Design 视觉覆盖
- Pinia 和 Vue Router
- UnoCSS 原子化样式
- Oxlint 和 Oxfmt 提供快速 lint 与 format
- VS Code 推荐扩展：Vue (Official)、Oxc、UnoCSS
- 支持多级子菜单的 Admin Layout
- Dashboard、列表、详情、编辑、设置、设计系统页面
- 用户选择、部门选择、权限矩阵、状态流转、复杂表格组件

## CLI 可选能力

创建项目时可以按需叠加后台工程骨架：

```bash
npm create aether-admin@latest my-admin -- --with-auth --with-http --with-mock
```

如果希望生成后直接进入开发状态，可以使用：

```bash
npm create aether-admin@latest my-admin -- --all --install --git
```

如果需要非交互默认生成：

```bash
npm create aether-admin@latest my-admin -- --yes
```

- `--with-auth`：Pinia 鉴权 store、Vue Router 路由守卫和 403 页面。
- `--with-http`：类型化 fetch 请求层、`.env.example` 和示例 API 模块。
- `--with-mock`：轻量本地 Mock API。
