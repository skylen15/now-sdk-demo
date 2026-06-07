# @kobidev/now-sdk-mock

A mock library for unit testing ServiceNow scoped applications built with the [ServiceNow SDK](https://docs.servicenow.com/). It provides in-memory implementations of core ServiceNow server-side APIs (`GlideRecord`, `GlideSystem`, `GlideDateTime`, etc.) so you can run Jest tests locally without connecting to a ServiceNow instance.

## Attribution

This package is an extended fork of [`sonisoft-cnanda/now-sdk-mock`](https://github.com/sonisoft-cnanda/now-sdk-mock), originally created by [Chris Nanda (`sonisoft-cnanda`)](https://github.com/sonisoft-cnanda).

The `@kobidev/now-sdk-mock` fork adds the ESM-only version 2 migration, GlideQuery mocks, stricter typing, shared-state reset support, and expanded verification. Thank you to Chris Nanda for creating and open-sourcing the original project.

## Features

- **In-memory database** -- tables, rows, queries, inserts, and updates all run locally
- **Mock Glide APIs** -- `GlideRecord`, `GlideQuery`, `GlideSystem`, `GlideElement`, `GlideDateTime`, `GlideDate`, `GlideTime`, `GlideAggregate`, `GlideQueryCondition`
- **Functional query results** -- `MockOptional` and lazy `MockStream`
- **Business rule support** -- register before/after business rules on tables and have them fire during `insert()` and `update()`
- **REST message mocks** -- `RESTMessageV2` / `RESTResponseV2` with a configurable data store for request/response bodies and status codes
- **System properties** -- `gs.getProperty()` / `gs.setProperty()` backed by an in-memory property store
- **Scoped cache mock** -- `MockScopedCacheManager` for `sn_scoped_cache.ScopedCacheManager`
- **Rhino environment** -- `initSnRhinoEnvironment()` registers ServiceNow globals (`Class`, `GlideRecord`, `gs`, etc.) so that classic Script Include code using `Class.create()` works in Node.js/Jest
- **Type-aware initialization** -- automatically reads your `@types/servicenow/glide.server.d.ts` declarations to define GlideRecord field accessors

## Important note

This library requires the `servicenow-glide` package (aliased as `@servicenow/glide`). The official `@servicenow/glide` npm package only contains type definitions without implementations, which causes errors when mocking objects. The `servicenow-glide` package includes stubbed implementations that enable proper mocking.

```json
"@servicenow/glide": "npm:servicenow-glide@^27.0.5"
```

## Installation

```bash
npm install @kobidev/now-sdk-mock --save-dev
```

Version 2 is ESM-only. Use `import` syntax; CommonJS loading is not supported.

You will also need the ServiceNow type definitions in your project. The library expects them at `@types/servicenow/glide.server.d.ts` relative to your project root by default (configurable).

## Quick start

### 1. Set up your test file

```js
// test/IncidentUtil.test.js
import {
  initSnRhinoEnvironment,
  initSNTestEnvironment,
  MockGlideRecord,
  resetMockState,
  loadClassicScriptInclude,
} from "@kobidev/now-sdk-mock";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Initialize the ServiceNow Rhino globals (Class, GlideRecord, gs, etc.)
initSnRhinoEnvironment();

// Initialize the test environment (reads @types/servicenow type declarations)
initSNTestEnvironment();

// Import your Script Include
const IncidentHelper = loadClassicScriptInclude(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/includes/sys_script_include/IncidentHelper.server.js"),
  "IncidentHelper",
);
```

### 2. Write tests

```js
describe("IncidentHelper", () => {
  let tblIncident;

  beforeEach(() => {
    // Reset every process-local mock store and Rhino global before each test
    resetMockState();

    // Register the table(s) your code uses
    tblIncident = Database.getInstance().addTable("incident");
  });

  it("createIncident should create a new incident", () => {
    const incidentData = {
      short_description: "Test Incident",
      description: "This is a test incident",
      caller_id: "test_user",
      category: "hardware",
      subcategory: "printer",
      priority: 1,
    };

    const insertSpy = jest.spyOn(MockGlideRecord.prototype, "insert");

    const incidentHelper = new IncidentHelper();
    const sysId = incidentHelper.createIncident(incidentData);

    // Verify insert was called and returned a sys_id
    expect(insertSpy).toHaveBeenCalled();
    expect(sysId).toBeDefined();

    // Verify the row was persisted in the in-memory table
    expect(tblIncident.getRows().length).toBe(1);

    // Read it back via GlideRecord
    var gr = new GlideRecord("incident");
    gr.get(sysId);
    expect(gr.short_description).toBe("Test Incident");
  });
});
```

### 3. Configure Jest

```ts
// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/test"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
```

### 4. Run tests

```bash
npx jest --config jest.config.ts
```

## API reference

### MockGlideQuery

```ts
import { Database, MockGlideQuery } from "@kobidev/now-sdk-mock";

Database.getInstance().addTable("incident").addRows([
  { sys_id: "1", active: true, priority: 2 },
  { sys_id: "2", active: false, priority: 3 },
]);

const incidents = new MockGlideQuery("incident")
  .where("active", true)
  .orderByDesc("priority")
  .select("priority")
  .toArray();
```

GlideQuery supports immutable query building, reads, mutations, aggregates, grouping, encoded-query parsing, `MockOptional`, and lazy `MockStream` results. ACL and security-data-filter markers do not enforce ServiceNow security locally. `disableAutoSysFields()` and `forceUpdate()` are immutable plan markers without platform side effects. Platform-dependent operators, metadata field flags, and full platform schema validation are rejected explicitly.

### Environment setup

| Function | Description |
|---|---|
| `initSnRhinoEnvironment()` | Registers ServiceNow globals on `global` (`Class`, `GlideRecord`, `GlideElement`, `GlideDateTime`, `GlideAggregate`, `GlideDate`, `GlideTime`, `AbstractAjaxProcessor`, `gs`). Call this at the top of your test file. |
| `initSNTestEnvironment(useRoot?, typesPath?, fileName?)` | Initializes the test environment and locates your ServiceNow type declarations. Defaults: `useRoot=true`, `typesPath='@types/servicenow'`, `fileName='glide.server.d.ts'`. |

### Database

The in-memory database is the core of the mock. It stores tables and rows that `MockGlideRecord` reads from and writes to.

```js
import { Database, resetMockState } from "@kobidev/now-sdk-mock";

// Reset every process-local mock store between tests
resetMockState();

// Add a table and seed data
const table = Database.getInstance().addTable("incident");
table.addRow({
  sys_id: "abc123",
  short_description: "Server down",
  priority: 1,
});
table.addRows([
  { sys_id: "def456", short_description: "Printer jam", priority: 3 },
  { sys_id: "ghi789", short_description: "VPN issue", priority: 2 },
]);

// Query rows
table.getRows();                          // all rows
table.getRowBySysId("abc123");            // by sys_id
table.getRowByField("priority", 1);       // by any field

// Delete rows
table.deleteRowBySysId("abc123");
table.deleteRowByField("priority", 3);
```

### MockGlideRecord

Mirrors the ServiceNow `GlideRecord` API. Reads from and writes to the in-memory `Database`.

```js
const gr = new GlideRecord("incident");

// Insert
gr.short_description = "New incident";
gr.priority = 2;
const sysId = gr.insert(); // returns sys_id

// Query
gr.addQuery("priority", "1");
gr.addEncodedQuery("active=true");
gr.setLimit(10);
gr.query();
while (gr.next()) {
  console.log(gr.getValue("short_description"));
}

// Get by sys_id
gr.get("abc123");

// Update
gr.short_description = "Updated description";
gr.update();
```

**Supported methods:** `insert()`, `update()`, `get()`, `query()`, `next()`, `hasNext()`, `addQuery()`, `addEncodedQuery()`, `addActiveQuery()`, `addNullQuery()`, `addNotNullQuery()`, `setValue()`, `getValue()`, `getElement()`, `getUniqueValue()`, `getTableName()`, `getRecordClassName()`, `getRowCount()`, `setLimit()`, `deleteMultiple()`, `reset()`, `isNewRecord()`, `isValidField()`, `isValidRecord()`, `isValid()`, `operation()`

### MockGlideSystem (`gs`)

```js
import { mockGs } from "@kobidev/now-sdk-mock";
// or use the global `gs` after calling initSnRhinoEnvironment()

gs.setProperty("my.app.setting", "enabled");
gs.getProperty("my.app.setting"); // "enabled"

gs.log("info message");
gs.error("error message");
gs.warn("warning");
gs.debug("debug message");

gs.nil(null);      // true
gs.nil("value");   // false
gs.getUserName();  // "admin"
gs.urlEncode("hello world"); // "hello%20world"
```

### MockGlideDateTime

```js
import { MockGlideDateTime } from "@kobidev/now-sdk-mock";

const now = new MockGlideDateTime();
const specific = new MockGlideDateTime("2024-01-15T10:30:00.000Z");

specific.toString();            // ISO string
specific.getNumericValue();     // epoch ms
specific.getDate();             // MockGlideDate
specific.getTime();             // MockGlideTime
specific.getYearUTC();
specific.getMonthUTC();
specific.getDayOfMonthUTC();
specific.addSeconds(3600);
specific.add(60000);            // add milliseconds
```

### MockGlideElement

```js
import { MockGlideElement } from "@kobidev/now-sdk-mock";

const elem = new MockGlideElement("some value");
elem.getValue();         // "some value"
elem.getDisplayValue();  // "some value"
elem.nil();              // false
elem.getBooleanValue();  // true
elem.setValue("new");
```

### Business rules

Register business rules on tables to simulate before/after insert and update logic.

```js
import {
  Database,
  DataTableBusinessRule,
  BusinessRuleRunWhen,
  BusinessRuleRunType,
} from "@kobidev/now-sdk-mock";

const table = Database.getInstance().addTable("incident");

// Define which operations trigger the rule
const brType = new BusinessRuleRunType();
brType.insert = true;
brType.update = false;
brType.delete = false;
brType.query = false;

// Create the rule
const rule = new DataTableBusinessRule(
  "Set default priority",       // name
  BusinessRuleRunWhen.BEFORE,   // BEFORE (10), AFTER (20), ASYNC (30)
  brType,                       // which operations
  function (current) {          // the rule logic -- `current` is the GlideRecord
    if (!current.priority) {
      current.setValue("priority", "4");
    }
  }
);

// Attach to the table
table.businessRules.push(rule);
```

### REST message mocks

Mock `RESTMessageV2` / `RESTResponseV2` for testing outbound REST integrations.

```js
import { MockRESTMessageV2, RESTDataStore } from "@kobidev/now-sdk-mock";

// Configure expected response
RESTDataStore.getInstance().mockResponseBody = JSON.stringify({
  result: "ok",
});
RESTDataStore.getInstance().mockResponseCode = 200;

// Use in your code under test
const rm = new MockRESTMessageV2();
rm.setEndpoint("https://api.example.com/v1/resource");
rm.setHttpMethod("POST");
rm.setRequestBody(JSON.stringify({ key: "value" }));

const response = rm.execute();
response.getBody();       // '{"result":"ok"}'
response.getStatusCode(); // 200

// Inspect what was sent
rm.getEndpoint();
rm.getRequestBody();
rm.getRequestHeaders();

// Clean up between tests
RESTDataStore.getInstance().clearMockData();
```

### MockScopedCacheManager

Mock for `sn_scoped_cache.ScopedCacheManager`.

```js
import { MockScopedCacheManager } from "@kobidev/now-sdk-mock";

// Mock the import in your test
jest.mock("@servicenow/glide/sn_scoped_cache", () => ({
  ScopedCacheManager: MockScopedCacheManager,
}));

// Usage
MockScopedCacheManager.put("myCatalog", "myKey", "myValue");
MockScopedCacheManager.get("myCatalog", "myKey"); // "myValue"
MockScopedCacheManager.flushScopedCache("myCatalog", "myKey");
MockScopedCacheManager.prefixFlush("myCatalog", "my");
```

## Project structure

```
now-sdk-mock/
├── src/
│   ├── @servicenow/glide/       # Mock Glide API implementations
│   │   ├── MockGlideRecord.ts
│   │   ├── MockGlideSystem.ts
│   │   ├── MockGlideElement.ts
│   │   ├── MockGlideDateTime.ts
│   │   ├── MockGlideDate.ts
│   │   ├── MockGlideTime.ts
│   │   ├── MockGlideAggregate.ts
│   │   ├── MockGlideQueryCondition.ts
│   │   ├── MockAbstractAjaxProcessor.ts
│   │   ├── constants.ts
│   │   └── sn_ws/                # REST message mocks
│   │       ├── MockRESTMessageV2.ts
│   │       └── MockRESTResponseV2.ts
│   ├── cache/                    # Scoped cache mock
│   │   └── MockScopedCacheManager.ts
│   ├── common/                   # Test environment and DB utilities
│   │   ├── SNTestEnvironment.ts
│   │   ├── GlideRecordDBInit.ts
│   │   ├── DBUtil.ts
│   │   └── GlideElementUtil.ts
│   ├── config/sn_js/             # Rhino environment setup
│   │   ├── initSNRhinoEnvironment.ts
│   │   └── PrototypeServer.ts    # Class.create() polyfill
│   └── data/                     # In-memory data layer
│       ├── Database.ts
│       ├── InMemoryDataTable.ts
│       ├── PropertyDB.ts
│       ├── PropertyTable.ts
│       ├── DataTableBusinessRule.ts
│       ├── BusinessRuleRunWhen.ts
│       ├── BusinessRuleRunType.ts
│       ├── EventQueue.ts
│       └── sn_ws/
│           ├── RESTDataStore.ts
│           ├── RESTMessageTemplate.ts
│           └── RESTMessageFunctionTemplate.ts
├── example/
│   └── sdk-mock-script-include/  # Example ServiceNow SDK app with tests
├── package.json
└── tsconfig.json
```

## Building from source

```bash
npm install
npm run build          # compile TypeScript to dist/
npm run build:clean    # rimraf dist/ then rebuild
```

## License

MIT
