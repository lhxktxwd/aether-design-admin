# Aether Design Admin

[简体中文](./README.zh-CN.md)

Modern Vue 3 + Element Plus Admin Starter with the Aether Design Admin visual system.

## Quick Start

Requires Node `^20.19.0 || >=22.12.0`.

```bash
npm create aether-admin@latest my-admin
cd my-admin
pnpm install
pnpm dev
```

The CLI starts a guided setup in an interactive terminal, so you can choose auth, HTTP, mock, install and git initialization without memorizing flags.

With optional admin scaffolding:

```bash
npm create aether-admin@latest my-admin -- --with-auth --with-http --with-mock
```

For the most complete out-of-the-box setup:

```bash
npm create aether-admin@latest my-admin -- --all --install --git
```

For non-interactive default generation:

```bash
npm create aether-admin@latest my-admin -- --yes
```

You can also use the short CLI alias after installing the package globally:

```bash
npm i -g create-aether-admin
cea my-admin
```

## Live Demo

Deploy this repository root to Vercel. The root app is the live demo, while the CLI template lives in `packages/create-aether-admin`.

## What's Included

- Vue 3, TypeScript, Vite
- Element Plus behavior with Aether Design Admin styling
- Pinia, Vue Router and UnoCSS
- Oxlint and Oxfmt for fast linting and formatting
- UnoCSS replaces TailwindCSS/PostCSS in the starter
- Oxlint/Oxfmt replace ESLint/Prettier in the starter
- VS Code recommendations including Vue (Official), Oxc and UnoCSS
- Admin layout with multi-level sidebar navigation
- Dashboard, list, detail, edit, settings and design system pages
- Query toolbar, saved views, advanced filters and DataTable Pro
- Business selectors, permission matrix, status flow and admin table variants

## Repository Layout

```txt
.
├─ packages/create-aether-admin  # npm create CLI
├─ templates/full                       # source template for maintainers
├─ src                                  # Vercel demo app
└─ docs                                 # design system notes
```

## CLI Development

```bash
node packages/create-aether-admin/bin/create-aether-admin.js my-admin --with-auth --with-http
```

## Publish CLI

```bash
cd packages/create-aether-admin
npm publish
```
