import { Database } from "../../src/data/Database.js";
import { MockGlideElement } from "../../src/@servicenow/glide/MockGlideElement.js";
import { MockGlideQuery } from "../../src/@servicenow/glide/MockGlideQuery.js";

type Incident = {
    sys_id: string;
    number: string;
    active: boolean;
    priority: number;
    category?: string | null;
    score: number;
};

const row = (values: Incident) => Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, new MockGlideElement(value)]),
);

describe("MockGlideQuery", () => {
    beforeEach(() => {
        Database.reInitialize();
        Database.getInstance().addTable("incident").addRows([
            row({ sys_id: "1", number: "INC001", active: true, priority: 1, category: "network", score: 10 }),
            row({ sys_id: "2", number: "INC002", active: true, priority: 2, category: "network", score: 20 }),
            row({ sys_id: "3", number: "TASK003", active: false, priority: 3, category: null, score: 30 }),
        ]);
    });

    it("builds immutable plans and evaluates where, order, and limit", () => {
        const base = new MockGlideQuery<Incident>("incident");
        const query = base.where("active", true).where("priority", ">", 1).orderByDesc("priority").limit(1);
        expect(base.plan).toHaveLength(0);
        expect(query.select("number", "priority").toArray()).toEqual([{ sys_id: "2", number: "INC002", priority: 2 }]);
    });

    it("supports nested OR queries and null clauses", () => {
        const nested = new MockGlideQuery<Incident>().where("priority", 1).orWhere("priority", 2);
        const results = new MockGlideQuery<Incident>("incident").where("active", true).where(nested).select("number").toArray();
        expect(results.map((result) => result.number)).toEqual(["INC001", "INC002"]);
        expect(new MockGlideQuery<Incident>("incident").where("priority", 1).orWhere("priority", 3).count()).toBe(2);
        expect(new MockGlideQuery<Incident>("incident").whereNull("category").count()).toBe(1);
        expect(new MockGlideQuery<Incident>("incident").whereNotNull("category").count()).toBe(2);
    });

    it.each([
        ["IN", [1, 3], 2],
        ["NOT IN", [1, 3], 1],
        ["STARTSWITH", "INC", 2],
        ["CONTAINS", "C00", 2],
        ["BETWEEN", [10, 20], 2],
    ] as const)("supports %s", (operator, value, count) => {
        const field = operator === "STARTSWITH" || operator === "CONTAINS" ? "number" : operator === "BETWEEN" ? "score" : "priority";
        expect(new MockGlideQuery<Incident>("incident").where(field, operator, value).count()).toBe(count);
    });

    it("supports get, getBy, selectOne, and encoded query parsing", () => {
        expect(new MockGlideQuery<Incident>("incident").get("2", ["number"]).get()).toEqual({ sys_id: "2", number: "INC002" });
        expect(new MockGlideQuery<Incident>("incident").getBy({ number: "INC001" }, ["priority"]).get().priority).toBe(1);
        expect(MockGlideQuery.parse<Incident>("incident", "active=true^ORDERBYDESCpriority").selectOne("number").get().number).toBe("INC002");
        expect(MockGlideQuery.parse<Incident>("incident", "numberSTARTSWITHINC").count()).toBe(2);
    });

    it("persists inserts, updates, upserts, and deletes", () => {
        const query = new MockGlideQuery<Incident>("incident");
        const inserted = query.insert({ number: "INC004", active: true, priority: 4, score: 40 }, ["number"]).get();
        expect(inserted.number).toBe("INC004");
        query.where("sys_id", String(inserted.sys_id)).update({ priority: 5 });
        expect(query.where("priority", 5).count()).toBe(1);
        expect(query.where("active", true).updateMultiple({ category: "updated" }).rowCount).toBe(3);
        query.where("priority", 5).deleteMultiple();
        expect(query.count()).toBe(3);
    });

    it("supports simple and grouped aggregates", () => {
        const query = new MockGlideQuery<Incident>("incident");
        expect(query.count()).toBe(3);
        expect(query.sum("score")).toBe(60);
        expect(query.avg("score")).toBe(20);
        expect(query.min("priority")).toBe(1);
        expect(query.max("priority")).toBe(3);
        expect(query.groupBy("category").aggregate("count").select().toArray()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ category: "network", count: 2 }),
                expect.objectContaining({ category: null, count: 1 }),
            ]),
        );
    });

    it("shares evaluation with MockGlideRecord", () => {
        const gr = new MockGlideQuery<Incident>("incident").where("priority", ">", 1).toGlideRecord();
        gr.query();
        expect(gr.getRowCount()).toBe(2);
    });

    it("rejects ambiguous and unsupported queries", () => {
        expect(() => new MockGlideQuery<Incident>("incident").orWhere("active", true)).toThrow("preceded");
        expect(() => new MockGlideQuery<Incident>("incident").where("priority", "IN", 1)).toThrow("array");
        expect(() => new MockGlideQuery<Incident>("incident").select("number$DISPLAY").toArray()).toThrow("Metadata");
        expect(() => new MockGlideQuery<Incident>("incident").where("active", true).update({ priority: 2 })).toThrow("sys_id");
    });

    it("uses deterministic contracts for platform-only features", () => {
        const marked = new MockGlideQuery<Incident>("incident")
            .withAcls()
            .withSecurityDataFilters()
            .disableAutoSysFields()
            .forceUpdate();

        expect(marked.count()).toBe(3);
        expect(marked.plan.map((step) => step.type)).toEqual([
            "withAcls",
            "withSecurityDataFilters",
            "disableAutoSysFields",
            "forceUpdate",
        ]);
        expect(() => MockGlideQuery.parse("incident", "opened_atDYNAMICjavascript:getMyGroups()")).toThrow("Unsupported encoded query");
        expect(() => MockGlideQuery.parse("incident", "opened_atONToday")).toThrow("Unsupported encoded query");
    });
});
