#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

export function validate(root = defaultRoot): { errors: string[]; count: number } {
  root = realpathSync(root);
  const errors: string[] = [];
  const fail = (file: string, message: string) => errors.push(`${file}: ${message}`);
  const inside = (path: string) => { const r = relative(root, path); return r !== '..' && !r.startsWith(`..${sep}`) && !r.startsWith(sep); };
  function local(file: string, target: string, directory = false) {
    let path;
    try { path = resolve(dirname(resolve(root, file)), decodeURIComponent(target)); }
    catch { fail(file, `invalid local reference ${target}`); return; }
    if (!inside(path) || (existsSync(path) && !inside(realpathSync(path)))) {
      fail(file, `reference escapes repository: ${target}`); return;
    }
    if (!existsSync(path)) fail(file, `missing local reference: ${target}`);
    else if (directory && !statSync(path).isDirectory()) fail(file, `expected directory: ${target}`);
  }
  function json(file: string): Record<string, unknown> | null {
    try { return JSON.parse(readFileSync(resolve(root, file), 'utf8')) as Record<string, unknown>; }
    catch (e) { fail(file, `cannot parse JSON: ${e instanceof Error ? e.message : String(e)}`); return null; }
  }
  const skills = resolve(root, 'skills');
  const folders = existsSync(skills) ? readdirSync(skills).filter(n => statSync(resolve(skills, n)).isDirectory()) : [];
  if (!folders.length) fail('skills/', 'no skill folders');
  for (const folder of folders) {
    const file = `skills/${folder}/SKILL.md`;
    if (!existsSync(resolve(root, file))) { fail(file, 'missing SKILL.md'); continue; }
    const src = readFileSync(resolve(root, file), 'utf8');
    const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) { fail(file, 'missing frontmatter'); continue; }
    const doc = parseDocument(match[1], { uniqueKeys: true });
    if (doc.errors.length) { fail(file, `invalid YAML: ${doc.errors.map(e => e.message).join('; ')}`); continue; }
    const data: unknown = doc.toJS();
    if (!isRecord(data)) { fail(file, 'frontmatter must be a mapping'); continue; }
    if (!text(data.name) || !slug.test(data.name) || data.name.length > 64) fail(file, 'name must be a lowercase kebab-case string of at most 64 characters');
    if (data.name !== folder) fail(file, 'name does not match folder');
    if (!text(data.description) || data.description.length > 1024) fail(file, 'description must be a nonempty string of at most 1024 characters');
    if (!src.slice(match[0].length).trim()) fail(file, 'empty skill body');
  }
  // Markdown destinations only: ignore code examples, external URLs and fragments.
  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (['.git', 'node_modules'].includes(entry.name) || entry.isSymbolicLink()) continue;
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.md')) {
        const file = relative(root, path);
        const src = readFileSync(path, 'utf8').replace(/^\s*(```|~~~)[\s\S]*?^\s*\1[^\n]*$/gm, '').replace(/`[^`\n]*`/g, '');
        const targets = [...src.matchAll(/!?\[[^\]\n]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+['"][^\n]*?['"])?\s*\)/g)].map(m => m[1]);
        targets.push(...[...src.matchAll(/^\s{0,3}\[[^\]]+\]:\s*(<[^>]+>|\S+)/gm)].map(m => m[1]));
        for (let target of targets) {
          target = target.replace(/^<|>$/g, '');
          if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
          target = target.split(/[?#]/)[0];
          if (target) local(file, target);
        }
      }
    }
  }
  walk(root);
  const file = '.claude-plugin/marketplace.json';
  const market = json(file);
  if (market) {
    if (!text(market.name) || !slug.test(market.name)) fail(file, 'invalid marketplace name');
    if (!text((isRecord(market.owner) ? market.owner.name : undefined))) fail(file, 'owner.name is required');
    if (!Array.isArray(market.plugins) || !market.plugins.length) fail(file, 'plugins must be a nonempty array');
    const names = new Set<string>();
    for (const plugin of Array.isArray(market.plugins) ? market.plugins : []) {
      if (!isRecord(plugin) || !text(plugin.name) || !slug.test(plugin.name)) { fail(file, 'invalid plugin name'); continue; }
      if (names.has(plugin.name)) fail(file, `duplicate plugin name: ${plugin.name}`);
      names.add(plugin.name);
      if (!text(plugin.description)) fail(file, `${plugin.name}: description is required`);
      if (typeof plugin.source !== 'string' || !plugin.source.startsWith('./')) fail(file, `${plugin.name}: this repository requires a local ./ source`);
      else {
        // Marketplace local sources resolve from repository root, not manifest directory.
        local('README.md', plugin.source, true);
        const manifest = resolve(root, plugin.source, '.claude-plugin/plugin.json');
        if (existsSync(manifest)) {
          const metadata = json(relative(root, manifest));
          if (metadata && metadata.name !== plugin.name) fail(relative(root, manifest), 'name differs from marketplace entry');
        }
      }
      if (plugin.keywords !== undefined && (!Array.isArray(plugin.keywords) || !plugin.keywords.every(text))) fail(file, `${plugin.name}: keywords must be nonempty strings`);
    }
  }
  return { errors, count: folders.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors, count } = validate();
  if (errors.length) { console.error(errors.map(e => `✗ ${e}`).join('\n')); process.exitCode = 1; }
  else console.log(`✓ ${count} skills, local Markdown references, and plugin manifests valid`);
}
