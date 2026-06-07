import { BusinessRuleRunWhen } from "../../data/BusinessRuleRunWhen.js";
import { Database } from "../../data/Database.js";
import { AggregateStep, AggregateType, DataRow, HavingStep, OrderStep, QueryEngine, QueryOperator, QueryPlanStep } from "../../data/QueryEngine.js";
import { MockGlideElement } from "./MockGlideElement.js";
import { MockGlideRecord } from "./MockGlideRecord.js";
import { MockOptional } from "./MockOptional.js";
import { MockStream } from "./MockStream.js";

const OPERATORS: Record<QueryOperator, "comparable" | "array" | "string"> = {
    "=": "comparable", "!=": "comparable", ">": "comparable", ">=": "comparable", "<": "comparable", "<=": "comparable",
    IN: "array", "NOT IN": "array", BETWEEN: "array",
    STARTSWITH: "string", ENDSWITH: "string", CONTAINS: "string", "DOES NOT CONTAIN": "string",
    INSTANCEOF: "string", SAMEAS: "string", NSAMEAS: "string", GT_FIELD: "string", LT_FIELD: "string",
    GT_OR_EQUALS_FIELD: "string", LT_OR_EQUALS_FIELD: "string", EMPTYSTRING: "string", ANYTHING: "string",
    LIKE: "string", "NOT LIKE": "string",
};

export type GlideQueryResult<T> = Partial<T> & { sys_id?: unknown } & Record<string, unknown>;

export class MockGlideQuery<T extends DataRow = DataRow> {
    readonly type = "GlideQuery";
    readonly table: string;
    readonly plan: readonly QueryPlanStep[];

    constructor(table = "", plan: readonly QueryPlanStep[] = []) {
        this.table = table;
        this.plan = Object.freeze([...plan]);
    }

    private append(step: QueryPlanStep): MockGlideQuery<T> {
        const query = new MockGlideQuery<T>(this.table, [...this.plan, Object.freeze(step)]);
        return step.type.includes("Where") || step.type === "where" ? MockGlideQuery.checkWhereAmbiguity(query) : query;
    }

    where(query: MockGlideQuery<T>): MockGlideQuery<T>;
    where(field: keyof T | string, value: unknown): MockGlideQuery<T>;
    where(field: keyof T | string, operator: QueryOperator, value: unknown): MockGlideQuery<T>;
    where(fieldOrQuery: keyof T | string | MockGlideQuery<T>, operatorOrValue?: unknown, value?: unknown): MockGlideQuery<T> {
        if (fieldOrQuery instanceof MockGlideQuery) return this.append({ type: "where", query: fieldOrQuery });
        const [operator, expected] = value === undefined ? ["=", operatorOrValue] : [operatorOrValue, value];
        MockGlideQuery.checkWhereOperator(operator as QueryOperator, expected);
        return this.append({ type: "where", field: String(fieldOrQuery), operator: operator as QueryOperator, value: expected });
    }

    orWhere(query: MockGlideQuery<T>): MockGlideQuery<T>;
    orWhere(field: keyof T | string, value: unknown): MockGlideQuery<T>;
    orWhere(field: keyof T | string, operator: QueryOperator, value: unknown): MockGlideQuery<T>;
    orWhere(fieldOrQuery: keyof T | string | MockGlideQuery<T>, operatorOrValue?: unknown, value?: unknown): MockGlideQuery<T> {
        if (fieldOrQuery instanceof MockGlideQuery) return this.append({ type: "orWhere", query: fieldOrQuery });
        const [operator, expected] = value === undefined ? ["=", operatorOrValue] : [operatorOrValue, value];
        MockGlideQuery.checkWhereOperator(operator as QueryOperator, expected);
        return this.append({ type: "orWhere", field: String(fieldOrQuery), operator: operator as QueryOperator, value: expected });
    }

    whereNull(field: keyof T | string): MockGlideQuery<T> { return this.append({ type: "whereNull", field: String(field) }); }
    orWhereNull(field: keyof T | string): MockGlideQuery<T> { return this.append({ type: "orWhereNull", field: String(field) }); }
    whereNotNull(field: keyof T | string): MockGlideQuery<T> { return this.append({ type: "whereNotNull", field: String(field) }); }
    orWhereNotNull(field: keyof T | string): MockGlideQuery<T> { return this.append({ type: "orWhereNotNull", field: String(field) }); }
    orderBy(field: keyof T | string): MockGlideQuery<T> { return this.append({ type: "orderBy", field: String(field) }); }
    orderByDesc(fieldOrAggregate: keyof T | string, field?: keyof T | string): MockGlideQuery<T> {
        return this.append({ type: "orderByDesc", field: String(field ?? fieldOrAggregate), aggregateType: field ? String(fieldOrAggregate) : undefined });
    }
    limit(value: number): MockGlideQuery<T> {
        if (!Number.isInteger(value) || value < 1) throw new Error("limit expects a positive integer");
        return this.append({ type: "limit", value });
    }
    disableWorkflow(): MockGlideQuery<T> { return this.append({ type: "disableWorkflow" }); }
    disableAutoSysFields(): MockGlideQuery<T> { return this.append({ type: "disableAutoSysFields" }); }
    forceUpdate(): MockGlideQuery<T> { return this.append({ type: "forceUpdate" }); }
    withAcls(): MockGlideQuery<T> { return this.append({ type: "withAcls" }); }
    withSecurityDataFilters(): MockGlideQuery<T> { return this.append({ type: "withSecurityDataFilters" }); }
    groupBy(...fields: (keyof T | string | (keyof T | string)[])[]): MockGlideQuery<T> {
        const flat = fields.flat().map(String);
        if (!flat.length) throw new Error("groupBy expects a field name");
        return flat.reduce<MockGlideQuery<T>>((query, field) => query.append({ type: "groupBy", field }), this);
    }
    aggregate(aggregateType: AggregateType, field?: keyof T | string): MockGlideQuery<T> {
        const type = aggregateType.toLowerCase() as AggregateType;
        if (!["avg", "min", "max", "sum", "count"].includes(type)) throw new Error(`Invalid aggregate type: ${type}`);
        return this.append({ type: "aggregate", aggregateType: type, field: field === undefined ? undefined : String(field) });
    }
    having(aggregateType: AggregateType, field: keyof T | string | undefined, operator: QueryOperator, value: number): MockGlideQuery<T> {
        if (!Number.isFinite(value) || OPERATORS[operator] !== "comparable") throw new Error("having expects a numeric value and comparison operator");
        return this.append({ type: "having", aggregateType, field: field === undefined ? undefined : String(field), operator, value });
    }

    private tableRows(): DataRow[] { return Database.getInstance().getTable(this.table)?.getRows() ?? []; }
    private matchingRows(): DataRow[] { return QueryEngine.execute(this.tableRows(), this.plan); }
    private fields(args: unknown[]): string[] { return (Array.isArray(args[0]) ? args[0] : args).map(String); }
    private workflowEnabled(): boolean { return !this.plan.some((step) => step.type === "disableWorkflow"); }

    private groupedRows(fields: readonly string[]): DataRow[] {
        const rows = this.matchingRows();
        const groups = this.plan.filter((step): step is OrderStep => step.type === "groupBy");
        const aggregates = this.plan.filter((step): step is AggregateStep => step.type === "aggregate");
        if (!groups.length && !aggregates.length) return rows.map((row) => QueryEngine.project(row, fields));
        const grouped = new Map<string, DataRow[]>();
        for (const row of rows) {
            const key = JSON.stringify(groups.map((step) => QueryEngine.unwrap(QueryEngine.read(row, step.field))));
            grouped.set(key, [...(grouped.get(key) ?? []), row]);
        }
        if (!groups.length) grouped.set("all", rows);
        let results = [...grouped.values()].map((group) => {
            const result: DataRow = {};
            for (const step of groups) result[step.field] = QueryEngine.unwrap(QueryEngine.read(group[0], step.field));
            for (const step of aggregates) result[`${step.aggregateType}${step.field ? `(${step.field})` : ""}`] = QueryEngine.aggregate(group, step.aggregateType, step.field);
            return result;
        });
        for (const having of this.plan.filter((step): step is HavingStep => step.type === "having")) {
            results = results.filter((result) => QueryEngine.evaluate(result, `${having.aggregateType}${having.field ? `(${having.field})` : ""}`, having.operator, having.value));
        }
        return QueryEngine.execute(results, this.plan.filter((step) => step.type === "orderBy" || step.type === "orderByDesc" || step.type === "limit"));
    }

    select(...fields: (keyof T | string | (keyof T | string)[])[]): MockStream<GlideQueryResult<T>> {
        return MockStream.fromArray(this.groupedRows(this.fields(fields)).map((row) => QueryEngine.project(row, this.fields(fields))) as GlideQueryResult<T>[]);
    }
    selectOne(...fields: (keyof T | string | (keyof T | string)[])[]): MockOptional<GlideQueryResult<T>> {
        const result = this.groupedRows(this.fields(fields))[0];
        return result ? MockOptional.of(QueryEngine.project(result, this.fields(fields)) as GlideQueryResult<T>) : MockOptional.empty();
    }
    get(key: string, fields: (keyof T | string)[] = []): MockOptional<GlideQueryResult<T>> { return this.where("sys_id", key).selectOne(fields.map(String)); }
    getBy(values: Partial<T>, fields: (keyof T | string)[] = []): MockOptional<GlideQueryResult<T>> {
        const query = Object.entries(values).reduce<MockGlideQuery<T>>((current, [field, value]) => current.where(field, value), this);
        return query.selectOne([...Object.keys(values), ...fields.map(String)]);
    }
    count(): number { return QueryEngine.aggregate(this.matchingRows(), "count"); }
    avg(field: keyof T | string): number | undefined { return QueryEngine.aggregate(this.matchingRows(), "avg", String(field)); }
    min(field: keyof T | string): any { return QueryEngine.aggregate(this.matchingRows(), "min", String(field)); }
    max(field: keyof T | string): any { return QueryEngine.aggregate(this.matchingRows(), "max", String(field)); }
    sum(field: keyof T | string): number | undefined { return QueryEngine.aggregate(this.matchingRows(), "sum", String(field)); }

    private runRules(row: DataRow, when: BusinessRuleRunWhen, operation: "insert" | "update" | "delete"): void {
        if (!this.workflowEnabled()) return;
        const gr = new MockGlideRecord(this.table);
        gr.mockCurrent = row;
        const rules = Database.getInstance().getTable(this.table)?.businessRules ?? [];
        for (const rule of rules.filter((candidate) => candidate.when === when && candidate.type[operation])) rule.method.call(gr, gr);
    }

    insert(values: Partial<T>, fields: (keyof T | string)[] = []): MockOptional<GlideQueryResult<T>> {
        const row: DataRow = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, new MockGlideElement(value)]));
        if (!row.sys_id) row.sys_id = new MockGlideElement(new MockGlideRecord(this.table).generateGUID());
        this.runRules(row, BusinessRuleRunWhen.BEFORE, "insert");
        Database.getInstance().addTable(this.table).addRow(row);
        this.runRules(row, BusinessRuleRunWhen.AFTER, "insert");
        return MockOptional.of(QueryEngine.project(row, fields.map(String)) as GlideQueryResult<T>);
    }
    insertOrUpdate(values: Partial<T>, fields: (keyof T | string)[] = [], reason?: string): MockOptional<GlideQueryResult<T>> {
        const sysId = QueryEngine.unwrap((values as DataRow).sys_id);
        return sysId && Database.getInstance().getTable(this.table)?.getRowBySysId(sysId)
            ? this.where("sys_id", sysId).update(values, fields, reason)
            : this.insert(values, fields);
    }
    update(values: Partial<T> = {}, fields: (keyof T | string)[] = [], _reason?: string): MockOptional<GlideQueryResult<T>> {
        const hasSysId = this.plan.some((step) => step.type === "where" && step.field === "sys_id" && step.operator === "=");
        if (!hasSysId) throw new Error("update requires an equality where clause on sys_id");
        const row = this.matchingRows()[0];
        if (!row) return MockOptional.empty("record not found");
        this.runRules(row, BusinessRuleRunWhen.BEFORE, "update");
        for (const [key, value] of Object.entries(values)) row[key] = new MockGlideElement(value);
        this.runRules(row, BusinessRuleRunWhen.AFTER, "update");
        return MockOptional.of(QueryEngine.project(row, fields.map(String)) as GlideQueryResult<T>);
    }
    updateMultiple(values: Partial<T>): { rowCount: number } {
        const rows = this.matchingRows();
        for (const row of rows) {
            this.runRules(row, BusinessRuleRunWhen.BEFORE, "update");
            for (const [key, value] of Object.entries(values)) row[key] = new MockGlideElement(value);
            this.runRules(row, BusinessRuleRunWhen.AFTER, "update");
        }
        return { rowCount: rows.length };
    }
    del(): void {
        const table = Database.getInstance().getTable(this.table);
        if (!table) return;
        const rows = this.matchingRows();
        for (const row of rows) this.runRules(row, BusinessRuleRunWhen.BEFORE, "delete");
        table.setRows(table.getRows().filter((row) => !rows.includes(row)));
        for (const row of rows) this.runRules(row, BusinessRuleRunWhen.AFTER, "delete");
    }
    deleteMultiple(): void { this.del(); }
    toGlideRecord(): MockGlideRecord { const gr = new MockGlideRecord(this.table); gr.setQueryPlan(this.plan); return gr; }
    toString(): string { return `GlideQuery<${this.table}> ${JSON.stringify(this.plan, null, 2)}`; }

    static parse<T extends DataRow = DataRow>(table: string, encodedQuery: string): MockGlideQuery<T> {
        let query = new MockGlideQuery<T>(table);
        for (const clause of encodedQuery.split("^").filter(Boolean)) {
            if (clause.startsWith("ORDERBYDESC")) query = query.orderByDesc(clause.slice(11));
            else if (clause.startsWith("ORDERBY")) query = query.orderBy(clause.slice(7));
            else if (clause.endsWith("ISNOTEMPTY")) query = query.whereNotNull(clause.slice(0, -10));
            else if (clause.endsWith("ISEMPTY")) query = query.whereNull(clause.slice(0, -7));
            else {
                const match = clause.match(/^(.+?)(DOES NOT CONTAIN|GT_OR_EQUALS_FIELD|LT_OR_EQUALS_FIELD|STARTSWITH|ENDSWITH|INSTANCEOF|EMPTYSTRING|NOT LIKE|NOT IN|GT_FIELD|LT_FIELD|CONTAINS|BETWEEN|ANYTHING|NSAMEAS|SAMEAS|LIKE|IN|!=|>=|<=|=|>|<)(.*)$/);
                if (!match) throw new Error(`Unsupported encoded query clause: ${clause}`);
                const [, field, operator, raw] = match;
                const value = operator.includes("IN") ? raw.split(",") : raw === "true" ? true : raw === "false" ? false : raw;
                query = query.where(field, operator as QueryOperator, value);
            }
        }
        return query;
    }

    static checkWhereOperator(operator: QueryOperator, value: unknown): void {
        const kind = OPERATORS[operator];
        if (!kind) throw new Error(`Operator '${operator}' is not supported by where`);
        if (kind === "array" && !Array.isArray(value)) throw new Error(`Operator '${operator}' can only be used on array values`);
        if (operator === "BETWEEN" && (value as unknown[]).length !== 2) throw new Error("BETWEEN requires array with two values");
        if (Array.isArray(value) && kind !== "array") throw new Error("Array values can only be used with 'NOT IN', 'IN', or 'BETWEEN' operators");
        if (kind === "string" && typeof value !== "string") throw new Error(`Operator '${operator}' can only be used on string values`);
    }
    static checkWhereAmbiguity<T extends DataRow>(query: MockGlideQuery<T>): MockGlideQuery<T> {
        const clauses = query.plan.filter((step) => step.type.includes("Where") || step.type === "where");
        const whereCount = clauses.filter((step) => step.type.startsWith("where")).length;
        const orCount = clauses.filter((step) => step.type.startsWith("or")).length;
        if (orCount && !whereCount) throw new Error("orWhere must be preceded by where/whereNull/whereNotNull expression");
        if (whereCount > 1 && orCount) throw new Error("Ambiguous query: cannot contain multiple where expressions with an orWhere expression");
        if (clauses.some((step) => "query" in step && step.query?.plan.some((nested) => "query" in nested && nested.query))) throw new Error("Cannot nest queries 3 or more levels");
        return query;
    }
}
