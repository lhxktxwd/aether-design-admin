# create-aether-admin

[简体中文](./README.zh-CN.md)

Create an Aether Design Admin Vue 3 + Element Plus starter.

Requires Node `^20.19.0 || >=22.12.0`.

```bash
npm create aether-admin@latest my-admin
```

In an interactive terminal, this starts a guided setup for optional admin scaffolding.

Or use the short alias after global install:

```bash
npm i -g create-aether-admin
cea my-admin
```

Then:

```bash
cd my-admin
pnpm install
pnpm dev
```

## Addons

The default template already includes Vue Router and Pinia. You can use the guided setup, or pass flags directly for scripts and CI:

```bash
npm create aether-admin@latest my-admin -- --with-auth --with-http --with-mock
```

For the most complete out-of-the-box setup:

```bash
npm create aether-admin@latest my-admin -- --all --install --git
```

Available addons:

- `--with-auth`: Pinia auth store, Vue Router guards and a 403 page.
- `--with-http`: typed fetch wrapper, `.env.example` and a sample API module.
- `--with-mock`: lightweight local mock API. Set `VITE_USE_MOCK=true` in `.env.local`.
- `--all`: enable auth, HTTP and mock addons.
- `--install`: install dependencies after generation.
- `--git`: initialize git and create the first commit.
- `--yes`: skip guided setup and generate the default template.

The template uses UnoCSS, plus Oxlint and Oxfmt for fast linting and formatting. The VS Code recommendation uses the extension ID `Vue.volar`, which is displayed as Vue (Official) in VS Code.
UnoCSS replaces TailwindCSS/PostCSS, while Oxlint/Oxfmt replace ESLint/Prettier for the default starter workflow.
