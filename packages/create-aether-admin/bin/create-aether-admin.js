#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const templateRoot = path.join(packageRoot, 'templates', 'full');

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith('-'));
const targetName = targetArg ?? 'aether-design-admin-app';
const cwd = process.cwd();
const targetDir = path.resolve(cwd, targetName);
const packageName = toPackageName(targetName);

main();

function main() {
  if (!fs.existsSync(templateRoot)) {
    fail(`Template not found: ${templateRoot}`);
  }

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    fail(`Target directory is not empty: ${path.relative(cwd, targetDir)}`);
  }

  fs.mkdirSync(targetDir, { recursive: true });
  copyDirectory(templateRoot, targetDir);
  replaceProjectNamePlaceholders(targetDir);

  console.log('');
  console.log(`Created Aether Design Admin project in ${path.relative(cwd, targetDir) || '.'}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${path.relative(cwd, targetDir) || '.'}`);
  console.log('  pnpm install');
  console.log('  pnpm dev');
  console.log('');
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

function toPackageName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\\/g, '/')
    .split('/')
    .filter(Boolean)
    .pop()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'aether-design-admin-app';
}

function fail(message) {
  console.error(`create-aether-admin: ${message}`);
  process.exit(1);
}
