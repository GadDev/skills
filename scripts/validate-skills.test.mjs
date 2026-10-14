import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { validate } from './validate-skills.mjs';

function fixture(t) {
  const root = mkdtempSync(resolve(tmpdir(), 'skills-validation-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (file, text) => { mkdirSync(resolve(root, file, '..'), { recursive: true }); writeFileSync(resolve(root, file), text); };
  write('skills/demo/SKILL.md', '---\nname: demo\ndescription: |\n  A multiline description.\n---\n# Demo\n');
  write('.claude-plugin/marketplace.json', JSON.stringify({ name: 'market', owner: { name: 'Owner' }, plugins: [{ name: 'bundle', description: 'Bundle', source: './' }] }));
  return { root, write, errors: () => validate(root).errors };
}
test('valid folded metadata, references and code examples', t => {
  const f = fixture(t);
  f.write('README.md', '[skill](skills/demo/SKILL.md)\n[ref][demo]\n[demo]: skills/demo/SKILL.md\n```md\n[example](missing.md)\n```\n`[inline](missing.md)`\n[web](https://example.com)\n[heading](#example)');
  assert.deepEqual(f.errors(), []);
});
for (const [label, body, expected] of [
  ['duplicate YAML keys', 'name: demo\nname: other\ndescription: hello', 'invalid YAML'],
  ['invalid YAML', 'name: [\ndescription: hello', 'invalid YAML'],
  ['typed description', 'name: demo\ndescription: 123', 'description'],
  ['blank description', 'name: demo\ndescription: " "', 'description'],
  ['wrong name', 'name: other\ndescription: hello', 'match folder'],
  ['invalid slug', 'name: Demo_Name\ndescription: hello', 'kebab-case'],
]) test(label, t => { const f=fixture(t); f.write('skills/demo/SKILL.md', `---\n${body}\n---\nBody`); assert.ok(f.errors().some(e=>e.includes(expected))); });
test('empty body and missing skill file', t => {
 const f=fixture(t); f.write('skills/demo/SKILL.md','---\nname: demo\ndescription: hi\n---\n');
 f.write('skills/missing/support.txt','support');
 assert.ok(f.errors().some(e=>e.includes('empty skill body')));
 assert.ok(f.errors().some(e=>e.includes('missing SKILL.md')));
});
test('broken inline and reference destinations and path escapes', t => {
 const f=fixture(t); f.write('README.md','[broken](missing.md)\n[x]: absent.md\n[escape](../outside.md)');
 const errors=f.errors(); assert.ok(errors.some(e=>e.includes('missing.md'))); assert.ok(errors.some(e=>e.includes('absent.md'))); assert.ok(errors.some(e=>e.includes('escapes repository')));
});
test('invalid JSON is reported',t=>{const f=fixture(t);f.write('.claude-plugin/marketplace.json','{');assert.ok(f.errors().some(e=>e.includes('parse JSON')));});
test('manifest duplicates, missing sources and invalid keywords',t=>{
 const f=fixture(t);f.write('.claude-plugin/marketplace.json',JSON.stringify({name:'market',owner:{name:'Owner'},plugins:[{name:'bundle',description:'ok',source:'./absent',keywords:[1]},{name:'bundle',description:'ok',source:'./'}]}));
 const errors=f.errors();for(const expected of ['duplicate plugin','missing local reference','keywords'])assert.ok(errors.some(e=>e.includes(expected)));
});
test('optional plugin manifest must match marketplace name',t=>{const f=fixture(t);f.write('.claude-plugin/plugin.json','{"name":"wrong"}');assert.ok(f.errors().some(e=>e.includes('differs')));});
