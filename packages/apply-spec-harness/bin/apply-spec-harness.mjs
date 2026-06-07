#!/usr/bin/env node
import { createInterface } from "node:readline/promises";
import { applyHarness, parseArguments, printHelp } from "../lib/apply-harness.mjs";

try {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
  } else {
    if (!options.presetProvided && process.stdin.isTTY) {
      const prompt = createInterface({ input: process.stdin, output: process.stdout });
      const answer = await prompt.question("Template preset [generic] (generic/servicenow-now-sdk): ");
      const selected = answer.trim() || "generic";
      if (!["generic", "servicenow-now-sdk"].includes(selected)) {
        prompt.close();
        throw new Error("Unknown preset. Use generic or servicenow-now-sdk.");
      }
      options.preset = selected;
      prompt.close();
    }
    if (options.preset === "servicenow-now-sdk" && !options.serviceNowRelease && process.stdin.isTTY) {
      const prompt = createInterface({ input: process.stdin, output: process.stdout });
      const answer = await prompt.question("ServiceNow instance release [zurich]: ");
      prompt.close();
      options.serviceNowRelease = answer.trim() || "zurich";
    }
    if (options.preset === "servicenow-now-sdk" && !options.tanstackRouterProvided && process.stdin.isTTY) {
      const prompt = createInterface({ input: process.stdin, output: process.stdout });
      const answer = await prompt.question("Include TanStack Router reference repo? [Y/n]: ");
      prompt.close();
      options.includeTanstackRouter = !["n", "no"].includes(answer.trim().toLowerCase());
    }
    if (options.preset === "servicenow-now-sdk" && !options.tanstackQueryProvided && process.stdin.isTTY) {
      const prompt = createInterface({ input: process.stdin, output: process.stdout });
      const answer = await prompt.question("Include TanStack Query reference repo? [Y/n]: ");
      prompt.close();
      options.includeTanstackQuery = !["n", "no"].includes(answer.trim().toLowerCase());
    }
    const result = applyHarness(options);
    console.log(`${options.dryRun ? "Dry run for" : "Applied spec harness to"}: ${result.target}`);
    for (const action of result.actions) console.log(`  ${action}`);
    if (result.conflicts.length > 0) {
      console.error("\nSkipped existing/conflicting entries:");
      for (const conflict of result.conflicts) console.error(`  ${conflict}`);
      console.error("\nRe-run with --force to replace them.");
      process.exitCode = 2;
    }
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
