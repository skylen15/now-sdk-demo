import {
    Database,
    EventQueue,
    MockGlideRecord,
    MockScopedCacheManager,
    PropertyDB,
    RESTDataStore,
    SNTestEnvironment,
    mockGs,
    resetMockState,
} from "../../src/index.js";

describe("resetMockState", () => {
    beforeEach(resetMockState);

    it("clears all mutable stores while preserving singleton identities", () => {
        const database = Database.getInstance();
        const properties = PropertyDB.getInstance();
        const events = EventQueue.getInstance();
        const rest = RESTDataStore.getInstance();
        const environment = SNTestEnvironment.getInstance();

        database.addTable("incident").addRow({ sys_id: "1" });
        properties.setProperty("x.test", "value");
        events.eventQueue("x.event", new MockGlideRecord("incident") as never, "a", "b", "default");
        rest.mockResponseBody = "body";
        rest.mockResponseCode = 500;
        rest.hasError = true;
        MockScopedCacheManager.put("catalog", "key", "value");
        environment.modulePath = "custom";
        (globalThis as Record<string, unknown>).GlideRecord = "overridden";

        resetMockState();

        expect(Database.getInstance()).toBe(database);
        expect(PropertyDB.getInstance()).toBe(properties);
        expect(EventQueue.getInstance()).toBe(events);
        expect(RESTDataStore.getInstance()).toBe(rest);
        expect(SNTestEnvironment.getInstance()).toBe(environment);
        expect(database.getTable("incident")).toBeUndefined();
        expect(properties.getProperty("x.test")).toBeUndefined();
        expect(events.entries).toHaveLength(0);
        expect(rest.mockResponseBody).toBe("");
        expect(rest.mockResponseCode).toBe(200);
        expect(rest.hasError).toBe(false);
        expect(MockScopedCacheManager.get("catalog", "key")).toBeNull();
        expect(environment.modulePath).toBe("");
        expect((globalThis as Record<string, unknown>).GlideRecord).toBe(MockGlideRecord);
        expect((globalThis as Record<string, unknown>).gs).toBe(mockGs);
    });
});
