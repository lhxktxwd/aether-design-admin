# Aether Design Admin

[English](./README.md)

现代化 Vue 3 + Element Plus Admin Starter，保留 Element Plus 的交互能力，同时使用 Aether Design Admin 的视觉系统重塑后台体验。

## 快速开始

```bash
npm create aether-admin@latest my-admin
cd my-admin
pnpm install
pnpm dev
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
- Pinia, Vue Router, Tailwind
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
node packages/create-aether-admin/bin/create-aether-admin.js my-admin
```

## 发布 CLI

```bash
cd packages/create-aether-admin
npm publish
```
