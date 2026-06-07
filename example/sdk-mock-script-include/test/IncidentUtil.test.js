import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
    Database,
    MockGlideRecord,
    initSNTestEnvironment,
    initSnRhinoEnvironment,
    loadClassicScriptInclude,
} from "@kobidev/now-sdk-mock";
import { fileURLToPath } from "node:url";
import path from "node:path";

initSnRhinoEnvironment();
initSNTestEnvironment();

const scriptPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/includes/sys_script_include/IncidentHelper.server.js");
const IncidentHelper = loadClassicScriptInclude(scriptPath, "IncidentHelper");

describe("IncidentUtil", () => {
    beforeEach(() => Database.reInitialize());

    it("createIncident should create new incident", () => {
        const table = Database.getInstance().addTable("incident");
        const insertSpy = jest.spyOn(MockGlideRecord.prototype, "insert");
        const helper = new IncidentHelper();

        const sysId = helper.createIncident({
            short_description: "Test Incident",
            description: "This is a test incident",
            caller_id: "test_user",
            category: "hardware",
            subcategory: "printer",
            priority: 1,
        });

        expect(insertSpy).toHaveBeenCalled();
        expect(sysId).toBeDefined();
        expect(table.getRows()).toHaveLength(1);
    });
});
