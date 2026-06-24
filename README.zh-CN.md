# Aether Design Admin

[English](./README.md)

现代化 Vue 3 + Element Plus Admin Starter，保留 Element Plus 的交互能力，同时使用 Aether Design Admin 的视觉系统重塑后台体验。

## 快速开始

需要 Node `^20.19.0 || >=22.12.0`。

```bash
npm create aether-admin@latest my-admin
cd my-admin
pnpm install
pnpm dev
```

在交互式终端里，CLI 会自动进入引导流程，可以直接选择鉴权、HTTP、Mock、自动安装依赖和 Git 初始化，不需要记一长串参数。

创建时也可以按需添加后台工程骨架：

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

如果你希望使用更短的命令，也可以全局安装后使用 `cea`：

```bash
npm i -g create-aether-admin
cea my-admin
```

## 在线演示

建议将本仓库根目录部署到 Vercel。根项目是在线 Demo，CLI 模板在 `packages/create-aether-admin`。

## 包含内容

- Vue 3, TypeScript, Vite
- 基于 Element Plus 行为能力的 Aether Design Admin 视觉覆盖
- Pinia, Vue Router, UnoCSS
- Oxlint 和 Oxfmt 提供快速 lint 与 format
- UnoCSS 替代 TailwindCSS/PostCSS
- Oxlint/Oxfmt 替代 ESLint/Prettier
- VS Code 推荐扩展：Vue (Official)、Oxc、UnoCSS
- 支持多级子菜单的 Admin Layout
- Dashboard、列表、详情、编辑、设置、设计系统示例页面
- QueryToolbar、SavedViews、AdvancedFilterPanel、DataTablePro
- 用户选择、部门选择、权限矩阵、状态流转、复杂表格组件

## 仓库结构

```txt
.
├─ packages/create-aether-admin  # npm create CLI
├─ templates/full                       # 维护用完整模板
├─ src                                  # Vercel Demo 应用
└─ docs                                 # 设计系统说明
```

## 本地测试 CLI

```bash
node packages/create-aether-admin/bin/create-aether-admin.js my-admin --with-auth --with-http
```

## 发布 CLI

```bash
cd packages/create-aether-admin
npm publish
```
