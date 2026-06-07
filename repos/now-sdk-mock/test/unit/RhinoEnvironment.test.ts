import { writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { initSnRhinoEnvironment } from "../../src/config/sn_js/initSNRhinoEnvironment.js";
import { loadClassicScriptInclude } from "../../src/config/sn_js/loadClassicScriptInclude.js";
import { MockGlideQuery } from "../../src/@servicenow/glide/MockGlideQuery.js";

describe("Rhino ESM environment", () => {
    it("registers GlideQuery globally", () => {
        initSnRhinoEnvironment();
        expect((globalThis as any).GlideQuery).toBe(MockGlideQuery);
    });

    it("loads a classic script without CommonJS", () => {
        initSnRhinoEnvironment();
        const file = path.join(tmpdir(), "ClassicThing.server.js");
        writeFileSync(file, "var ClassicThing = Class.create(); ClassicThing.prototype.value = function () { return 'ok'; };");
        try {
            const ClassicThing = loadClassicScriptInclude<any>(file, "ClassicThing");
            expect(new ClassicThing().value()).toBe("ok");
        } finally {
            rmSync(file, { force: true });
        }
    });
});
