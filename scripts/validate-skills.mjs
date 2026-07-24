#!/usr/bin/env node
// Validates every skills/<name>/SKILL.md:
//   - has a YAML frontmatter block
//   - declares non-empty `name` and `description`
//   - `name` matches its containing folder
// Dependency-free so it runs anywhere `node` does. Exits non-zero on any error.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const skillsDir = join(root, "skills");
const errors = [];

/** Pull the top `---`-fenced frontmatter block and return it as a string, or null. */
function extractFrontmatter(src) {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

/** Minimal scalar reader for `key: value` lines — enough for name/description. */
function readScalar(block, key) {
  const line = block
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${key}:`));
  if (!line) return null;
  return line.slice(key.length + 1).trim().replace(/^["']|["']$/g, "");
}

if (!existsSync(skillsDir)) {
  console.error(`✗ no skills/ directory at ${skillsDir}`);
  process.exit(1);
}

const folders = readdirSync(skillsDir).filter((n) =>
  statSync(join(skillsDir, n)).isDirectory()
);

if (folders.length === 0) errors.push("skills/ contains no skill folders");

for (const folder of folders) {
  const file = join(skillsDir, folder, "SKILL.md");
  if (!existsSync(file)) {
    errors.push(`${folder}/: missing SKILL.md`);
    continue;
  }

  const src = readFileSync(file, "utf8");
  const block = extractFrontmatter(src);
  if (!block) {
    errors.push(`${folder}/SKILL.md: no YAML frontmatter block`);
    continue;
  }

  const name = readScalar(block, "name");
  const description = readScalar(block, "description");

  if (!name) errors.push(`${folder}/SKILL.md: missing \`name\``);
  else if (name !== folder)
    errors.push(`${folder}/SKILL.md: name \`${name}\` does not match folder \`${folder}\``);

  if (!description) errors.push(`${folder}/SKILL.md: missing \`description\``);
}

if (errors.length > 0) {
  console.error("✗ skill validation failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ ${folders.length} skill(s) valid`);
