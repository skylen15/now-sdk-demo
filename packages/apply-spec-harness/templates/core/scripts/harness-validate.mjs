import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fromRoot = (...parts) => path.join(root, ...parts);
const fail = (message) => { throw new Error(`Harness validation failed: ${message}`); };
const backlog = JSON.parse(fs.readFileSync(fromRoot("docs", "harness", "backlog.json"), "utf8"));
const state = fs.readFileSync(fromRoot("docs", "harness", "state.md"), "utf8");
const match = state.match(/^## Current Story\s+US(\d{3})\s+-\s+([^\r\n]+)/m);
if (!match) fail("state.md must declare Current Story as 'US### - Title'.");

const stories = backlog.stories ?? [];
const active = stories.filter((story) => story.normalizedState === "active");
if (active.length !== 1) fail(`backlog.json must contain exactly one active story; found ${active.length}.`);
if (active[0].id !== `US${match[1]}`) fail("state.md current story does not match the active backlog story.");
if (new Set(stories.map((story) => story.id)).size !== stories.length) fail("backlog contains duplicate story IDs.");

for (const story of stories) {
  if (!["planned", "active", "blocked", "complete"].includes(story.normalizedState)) fail(`${story.id} has an invalid normalizedState.`);
  const source = fromRoot(...story.sourcePath.split("/"));
  if (!fs.existsSync(source)) fail(`${story.id} sourcePath does not exist: ${story.sourcePath}.`);
  const text = fs.readFileSync(source, "utf8");
  for (const heading of ["## Acceptance Criteria", "## Testing"]) {
    if (!text.split(/\r?\n/).includes(heading)) fail(`${story.id} source document is missing '${heading}'.`);
  }
}

console.log("Harness validation passed.");
console.log(`Active story: ${active[0].id} - ${active[0].title}`);
console.log(`Stories: ${stories.length}`);
