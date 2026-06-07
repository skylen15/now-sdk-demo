import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

execFileSync(process.execPath, [path.join(root, "node_modules/ctix/dist/cjs/cli.cjs"), "build", "--config", "./.ctirc"], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(process.execPath, [path.join(root, "scripts/fix-esm-imports.mjs"), "src"], { cwd: root, stdio: "inherit" });
