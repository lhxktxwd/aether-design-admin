# create-aether-admin

[English](./README.md)

创建 Aether Design Admin 项目的 npm create CLI。

需要 Node `^20.19.0 || >=22.12.0`。

```bash
npm create aether-admin@latest my-admin
```

在交互式终端里，这条命令会自动进入引导流程，让你选择需要的后台工程能力。

或者全局安装后使用更短的别名：

```bash
npm i -g create-aether-admin
cea my-admin
```

然后运行：

```bash
cd my-admin
pnpm install
pnpm dev
```

## 可选能力

默认模板已经包含 Vue Router 和 Pinia。你可以使用引导式流程，也可以在脚本或 CI 中直接传参数：

```bash
npm create aether-admin@latest my-admin -- --with-auth --with-http --with-mock
```

如果希望生成后直接进入开发状态，可以使用：

```bash
npm create aether-admin@latest my-admin -- --all --install --git
```

可用参数：

- `--with-auth`：添加 Pinia 鉴权 store、Vue Router 路由守卫和 403 页面。
- `--with-http`：添加类型化 fetch 请求层、`.env.example` 和示例 API 模块。
- `--with-mock`：添加轻量本地 Mock API，在 `.env.local` 中设置 `VITE_USE_MOCK=true` 即可启用。
- `--all`：启用鉴权、HTTP 和 Mock 可选能力。
- `--install`：生成后自动安装依赖。
- `--git`：初始化 Git 并创建首个提交。
- `--yes`：跳过引导流程，生成默认模板。

模板使用 UnoCSS，并内置 Oxlint / Oxfmt 作为快速 lint 与 format 工具。VS Code 推荐扩展中使用的扩展 ID 是 `Vue.volar`，它在 VS Code 中显示为 Vue (Official)。
默认工程里 UnoCSS 替代 TailwindCSS/PostCSS，Oxlint/Oxfmt 替代 ESLint/Prettier。
