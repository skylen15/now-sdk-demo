import { readFileSync } from "node:fs";
import vm from "node:vm";

export function loadClassicScriptInclude<T = any>(filePath: string, exportName: string): T {
    const context = vm.createContext({ ...globalThis });
    vm.runInContext(readFileSync(filePath, "utf8"), context, { filename: filePath });
    const exported = (context as Record<string, any>)[exportName];
    if (exported === undefined) throw new Error(`Classic Script Include did not define '${exportName}'`);
    return exported as T;
}
