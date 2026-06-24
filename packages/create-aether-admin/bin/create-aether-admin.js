#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const templateRoot = path.join(packageRoot, 'templates', 'full');
const addonsRoot = path.join(packageRoot, 'addons');

const args = process.argv.slice(2);
const options = parseOptions(args);
const cwd = process.cwd();
const requiredNodeVersion = '^20.19.0 || >=22.12.0';
let targetName = options.targetName ?? 'aether-design-admin-app';
let targetDir = path.resolve(cwd, targetName);
let packageName = toPackageName(targetName);

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});

async function main() {
  ensureSupportedNodeVersion();

  if (options.help) {
    printHelp();
    return;
  }

  if (options.interactive) {
    await promptForOptions(options);
  }

  configureTarget(options.targetName ?? 'aether-design-admin-app');

  if (!fs.existsSync(templateRoot)) {
    fail(`Template not found: ${templateRoot}`);
  }

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    fail(`Target directory is not empty: ${path.relative(cwd, targetDir)}`);
  }

  fs.mkdirSync(targetDir, { recursive: true });
  copyDirectory(templateRoot, targetDir);
  normalizeTemplateFiles(targetDir);
  replaceProjectNamePlaceholders(targetDir);
  applyAddons(targetDir, options.addons);
  initializeProject(targetDir, options);

  console.log('');
  console.log(`Created Aether Design Admin project in ${path.relative(cwd, targetDir) || '.'}`);
  if (options.addons.size > 0) {
    console.log(`Enabled addons: ${Array.from(options.addons).join(', ')}`);
  }
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${path.relative(cwd, targetDir) || '.'}`);
  if (!options.install) {
    console.log(`  ${options.packageManager} install`);
  }
  console.log('  pnpm dev');
  console.log('');
}

function configureTarget(name) {
  targetName = name;
  targetDir = path.resolve(cwd, targetName);
  packageName = toPackageName(targetName);
}

function ensureSupportedNodeVersion() {
  const [major, minor] = process.versions.node.split('.').map((part) => Number(part));
  const isSupported = major > 22 || (major === 22 && minor >= 12) || (major === 20 && minor >= 19);

  if (!isSupported) {
    fail(`Node ${requiredNodeVersion} is required. Current version: ${process.version}`);
  }
}

function parseOptions(argv) {
  const addons = new Set();
  let targetName;
  let help = false;
  let install = false;
  let initGit = false;
  let interactive = process.stdin.isTTY && process.stdout.isTTY;
  let packageManager = 'pnpm';

  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      help = true;
      continue;
    }

    if (arg === '--yes' || arg === '-y' || arg === '--default') {
      interactive = false;
      continue;
    }

    if (arg === '--interactive' || arg === '-i') {
      interactive = true;
      continue;
    }

    if (arg === '--install') {
      install = true;
      interactive = false;
      continue;
    }

    if (arg === '--git') {
      initGit = true;
      interactive = false;
      continue;
    }

    if (arg.startsWith('--pm=')) {
      packageManager = arg.slice('--pm='.length);
      interactive = false;
      continue;
    }

    if (arg === '--all' || arg === '--full-stack') {
      ['auth', 'http', 'mock'].forEach((addon) => addons.add(addon));
      interactive = false;
      continue;
    }

    if (arg.startsWith('--addons=')) {
      arg
        .slice('--addons='.length)
        .split(',')
        .map((addon) => addon.trim())
        .filter(Boolean)
        .forEach((addon) => addons.add(normalizeAddonName(addon)));
      interactive = false;
      continue;
    }

    if (arg.startsWith('--with-')) {
      addons.add(normalizeAddonName(arg.slice('--with-'.length)));
      interactive = false;
      continue;
    }

    if (arg.startsWith('--')) {
      addons.add(normalizeAddonName(arg.slice(2)));
      interactive = false;
      continue;
    }

    if (!targetName) {
      targetName = arg;
    }
  }

  validateAddons(addons);
  validatePackageManager(packageManager);

  return { addons, help, initGit, install, interactive, packageManager, targetName };
}

async function promptForOptions(projectOptions) {
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log('');
    console.log('Aether Design Admin setup');
    console.log('');

    if (!projectOptions.targetName) {
      projectOptions.targetName = await askText(prompt, 'Project name', 'aether-design-admin-app');
    }

    selectAddon(projectOptions, 'auth', await askYesNo(prompt, 'Add auth store, route guards and 403 page?', true));
    selectAddon(projectOptions, 'http', await askYesNo(prompt, 'Add typed HTTP request layer and sample API?', true));
    selectAddon(projectOptions, 'mock', await askYesNo(prompt, 'Add local mock API for development?', true));
    projectOptions.install = await askYesNo(prompt, 'Install dependencies after creation?', false);
    if (projectOptions.install) {
      projectOptions.packageManager = await askChoice(
        prompt,
        'Package manager',
        ['pnpm', 'npm', 'yarn', 'bun'],
        projectOptions.packageManager,
      );
    }

    projectOptions.initGit = await askYesNo(prompt, 'Initialize git repository?', true);
  } finally {
    prompt.close();
  }
}

async function askText(prompt, question, defaultValue) {
  const answer = (await ask(prompt, `${question} (default ${defaultValue}) `)).trim();
  return answer || defaultValue;
}

function selectAddon(projectOptions, addon, selected) {
  if (selected) {
    projectOptions.addons.add(addon);
  } else {
    projectOptions.addons.delete(addon);
  }
}

async function askYesNo(prompt, question, defaultValue) {
  const suffix = defaultValue ? 'Y/n' : 'y/N';
  const answer = (await ask(prompt, `${question} (${suffix}) `)).trim().toLowerCase();

  if (!answer) return defaultValue;
  return ['y', 'yes'].includes(answer);
}

async function askChoice(prompt, question, choices, defaultValue) {
  const answer = (await ask(prompt, `${question} (${choices.join('/')}, default ${defaultValue}) `))
    .trim()
    .toLowerCase();
  const choice = answer || defaultValue;

  if (!choices.includes(choice)) {
    console.log(`Using default: ${defaultValue}`);
    return defaultValue;
  }

  return choice;
}

function ask(prompt, question) {
  return new Promise((resolve) => {
    prompt.question(question, resolve);
  });
}

function normalizeAddonName(name) {
  const aliases = {
    guard: 'auth',
    guards: 'auth',
    request: 'http',
    requestor: 'http',
    api: 'http',
    mocks: 'mock',
  };

  return aliases[name] ?? name;
}

function validateAddons(addons) {
  const availableAddons = new Set(['auth', 'http', 'mock']);
  for (const addon of addons) {
    if (!availableAddons.has(addon)) {
      fail(`Unknown addon "${addon}". Available addons: auth, http, mock`);
    }
  }
}

function validatePackageManager(packageManager) {
  if (!['pnpm', 'npm', 'yarn', 'bun'].includes(packageManager)) {
    fail(`Unknown package manager "${packageManager}". Available package managers: pnpm, npm, yarn, bun`);
  }
}

function initializeProject(projectDir, projectOptions) {
  if (projectOptions.install) {
    runCommand(projectOptions.packageManager, ['install'], projectDir);
  }

  if (projectOptions.initGit) {
    runCommand('git', ['init'], projectDir);
    runCommand('git', ['add', '.'], projectDir);
    runCommand('git', ['commit', '-m', 'init aether design admin'], projectDir, true);
  }
}

function runCommand(command, commandArgs, commandCwd, allowFailure = false) {
  try {
    execFileSync(command, commandArgs, {
      cwd: commandCwd,
      stdio: 'inherit',
    });
  } catch {
    if (allowFailure) return;
    fail(`Command failed: ${command} ${commandArgs.join(' ')}`);
  }
}

function applyAddons(projectDir, addons) {
  for (const addon of addons) {
    const addonRoot = path.join(addonsRoot, addon);
    if (!fs.existsSync(addonRoot)) {
      fail(`Addon not found: ${addon}`);
    }
    copyDirectory(addonRoot, projectDir);
  }

  if (addons.has('auth')) {
    enableAuthAddon(projectDir);
  }

  if (addons.has('http')) {
    enableHttpAddon(projectDir);
  }

  if (addons.has('mock')) {
    enableMockAddon(projectDir);
  }
}

function copyDirectory(source, destination) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true });
      copyDirectory(sourcePath, destinationPath);
      continue;
    }

    fs.copyFileSync(sourcePath, destinationPath);
  }
}

function normalizeTemplateFiles(projectDir) {
  const gitignoreTemplate = path.join(projectDir, '_gitignore');
  const gitignorePath = path.join(projectDir, '.gitignore');

  if (fs.existsSync(gitignoreTemplate) && !fs.existsSync(gitignorePath)) {
    fs.renameSync(gitignoreTemplate, gitignorePath);
  }
}

function enableAuthAddon(projectDir) {
  const routerPath = path.join(projectDir, 'src', 'router', 'index.ts');
  let routerContent = fs.readFileSync(routerPath, 'utf8');

  if (!routerContent.includes("import ForbiddenView from '@/views/ForbiddenView.vue';")) {
    routerContent = routerContent.replace(
      "import AdminKitView from '@/views/AdminKitView.vue';",
      "import AdminKitView from '@/views/AdminKitView.vue';\nimport ForbiddenView from '@/views/ForbiddenView.vue';\nimport { setupRouterGuards } from '@/router/guards';",
    );
  }

  if (!routerContent.includes("name: 'forbidden'")) {
    routerContent = routerContent.replace(
      "    { path: '/admin-kit', name: 'admin-kit', component: AdminKitView, meta: { title: 'Admin Kit' } },",
      "    { path: '/admin-kit', name: 'admin-kit', component: AdminKitView, meta: { title: 'Admin Kit' } },\n    { path: '/403', name: 'forbidden', component: ForbiddenView, meta: { public: true, title: 'Forbidden' } },",
    );
  }

  if (!routerContent.includes('setupRouterGuards(router);')) {
    routerContent = routerContent.replace(
      /\nrouter\.afterEach\(\(to\) => \{\n  const appTitle = import\.meta\.env\.VITE_APP_TITLE \?\? 'Aether Admin';\n  document\.title = to\.meta\.title \? `\$\{String\(to\.meta\.title\)\} - \$\{appTitle\}` : appTitle;\n\}\);\s*$/,
      '\nsetupRouterGuards(router);\n',
    );
  }

  fs.writeFileSync(routerPath, routerContent);
}

function enableHttpAddon(projectDir) {
  updateEnvExample(projectDir, {
    VITE_API_BASE_URL: '/api',
    VITE_USE_MOCK: 'false',
  });
}

function enableMockAddon(projectDir) {
  const mainPath = path.join(projectDir, 'src', 'main.ts');
  let mainContent = fs.readFileSync(mainPath, 'utf8');

  if (!mainContent.includes("import { installMockApi } from '@/mocks/installMockApi';")) {
    mainContent = mainContent.replace(
      "import { router } from './router';",
      "import { router } from './router';\nimport { installMockApi } from '@/mocks/installMockApi';",
    );
  }

  if (!mainContent.includes('installMockApi();')) {
    mainContent = mainContent.replace(
      'const app = createApp(App);',
      'installMockApi();\n\nconst app = createApp(App);',
    );
  }

  fs.writeFileSync(mainPath, mainContent);
  enableHttpAddon(projectDir);
  updateEnvExample(projectDir, {
    VITE_USE_MOCK: 'true',
  });
}

function updateEnvExample(projectDir, values) {
  const envPath = path.join(projectDir, '.env.example');
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const lines = existing.split(/\r?\n/).filter(Boolean);
  const keys = new Set(Object.keys(values));
  const nextLines = lines.map((line) => {
    const [key] = line.split('=');
    if (!keys.has(key)) return line;
    keys.delete(key);
    return `${key}=${values[key]}`;
  });

  for (const key of keys) {
    nextLines.push(`${key}=${values[key]}`);
  }

  fs.writeFileSync(envPath, `${nextLines.join('\n')}\n`);
}

function replaceInFile(filePath, search, replacement) {
  const content = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, content.replaceAll(search, replacement));
}

function replaceProjectNamePlaceholders(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      replaceProjectNamePlaceholders(entryPath);
      continue;
    }

    if (!isTextTemplateFile(entry.name)) continue;

    const replacement = entry.name === 'package.json' ? packageName : targetName;
    replaceInFile(entryPath, '__PROJECT_NAME__', replacement);
  }
}

function isTextTemplateFile(fileName) {
  return ['.json', '.md', '.ts', '.vue', '.css', '.html', '.cjs'].includes(path.extname(fileName));
}

function printHelp() {
  console.log(`
create-aether-admin

Usage:
  npm create aether-admin@latest <project-name> -- [options]
  cea <project-name> [options]

Options:
  --with-auth       Add Pinia auth store, router guards and a 403 page
  --with-http       Add typed fetch request layer and sample API module
  --with-mock       Add a lightweight mock API for local development
  --addons=a,b      Enable addons by name: auth,http,mock
  --all             Enable all addons
  --install         Install dependencies after files are created
  --git             Initialize a git repository and create the first commit
  --pm=name         Package manager for --install: pnpm,npm,yarn,bun
  -i, --interactive Start guided setup explicitly
  -y, --yes         Skip guided setup and use the default template
  -h, --help        Show this help
`);
}

function toPackageName(name) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/\\/g, '/')
      .split('/')
      .filter(Boolean)
      .pop()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'aether-design-admin-app'
  );
}

function fail(message) {
  console.error(`create-aether-admin: ${message}`);
  process.exit(1);
}
