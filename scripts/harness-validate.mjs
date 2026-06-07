import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fromRoot = (...parts) => path.join(root, ...parts);
const fail = (message) => {
    throw new Error(`Harness validation failed: ${message}`);
};

const backlog = JSON.parse(fs.readFileSync(fromRoot("docs", "harness", "backlog.json"), "utf8"));
const stateText = fs.readFileSync(fromRoot("docs", "harness", "state.md"), "utf8");
const currentStoryMatch = stateText.match(/^## Current Story\s+US(\d{3})\s+-\s+([^\r\n]+)/m);

if (!currentStoryMatch) {
    fail("state.md must declare Current Story as 'US### - Title'.");
}

const currentStoryId = `US${currentStoryMatch[1]}`;
const stories = backlog.stories ?? [];
const validNormalizedStates = new Set(["planned", "active", "blocked", "complete"]);
const activeStories = stories.filter(({ normalizedState }) => normalizedState === "active");
const seenIds = new Set();
const duplicateIds = new Set();

for (const story of stories) {
    if (seenIds.has(story.id)) duplicateIds.add(story.id);
    seenIds.add(story.id);
}

if (duplicateIds.size > 0) {
    fail(`duplicate story IDs: ${[...duplicateIds].join(", ")}.`);
}

if (activeStories.length !== 1) {
    fail(`backlog.json must contain exactly one active normalizedState; found ${activeStories.length}.`);
}

if (activeStories[0].id !== currentStoryId) {
    fail(`state.md current story '${currentStoryId}' does not match active backlog story '${activeStories[0].id}'.`);
}

for (const story of stories) {
    if (!validNormalizedStates.has(story.normalizedState)) {
        fail(`${story.id} has invalid normalizedState '${story.normalizedState}'.`);
    }

    if (!story.state) {
        fail(`${story.id} is missing raw ServiceNow state.`);
    }

    const sourcePath = fromRoot(...story.sourcePath.split("/"));
    if (!fs.existsSync(sourcePath)) {
        fail(`${story.id} sourcePath does not exist: ${story.sourcePath}.`);
    }

    const storyText = fs.readFileSync(sourcePath, "utf8");
    if (!new RegExp(`^# ${story.id}\\s+-\\s+`, "m").test(storyText)) {
        fail(`${story.id} source document heading does not match its backlog ID.`);
    }

    for (const requiredHeading of ["## Acceptance Criteria", "## Testing"]) {
        if (!storyText.split(/\r?\n/).includes(requiredHeading)) {
            fail(`${story.id} source document is missing '${requiredHeading}'.`);
        }
    }
}

const count = (state) => stories.filter(({ normalizedState }) => normalizedState === state).length;

console.log("Harness validation passed.");
console.log(`Active story: ${activeStories[0].id} - ${activeStories[0].title}`);
console.log(`Stories: ${stories.length}; complete: ${count("complete")}; planned: ${count("planned")}`);
