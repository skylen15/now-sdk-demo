import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const roots = process.argv.slice(2);

function visit(target) {
  if (statSync(target).isDirectory()) {
    for (const entry of readdirSync(target)) visit(path.join(target, entry));
    return;
  }
  if (!/\.[jt]s$/.test(target) || target.endsWith(".bak")) return;
  const source = readFileSync(target, "utf8");
  let updated = source.replace(
    /(from\s+["']|import\s+["']|export\s+\*\s+from\s+["'])(\.\.?\/[^"']+?)(?<!\.js)(?<!\.json)(["'])/g,
    "$1$2.js$3",
  );
  updated = updated.replace(/(["'])(\.\.?\/[^"']+)\.js(["'])/g, (match, open, specifier, close) => {
    const candidate = path.resolve(path.dirname(target), specifier);
    try {
      return statSync(candidate).isDirectory() ? `${open}${specifier}/index.js${close}` : match;
    } catch {
      return match;
    }
  });
  if (updated !== source) writeFileSync(target, updated);
}

for (const root of roots) visit(path.resolve(root));
