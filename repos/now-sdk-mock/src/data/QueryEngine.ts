import { MockGlideElement } from "../@servicenow/glide/MockGlideElement.js";

export type QueryOperator =
    | "=" | "!=" | ">" | ">=" | "<" | "<="
    | "IN" | "NOT IN" | "STARTSWITH" | "ENDSWITH" | "CONTAINS"
    | "DOES NOT CONTAIN" | "INSTANCEOF" | "SAMEAS" | "NSAMEAS"
    | "GT_FIELD" | "LT_FIELD" | "GT_OR_EQUALS_FIELD" | "LT_OR_EQUALS_FIELD"
    | "BETWEEN" | "EMPTYSTRING" | "ANYTHING" | "LIKE" | "NOT LIKE";

export type QueryPlanStep =
    | { type: "where" | "orWhere"; field?: string; operator?: QueryOperator; value?: unknown; query?: { plan: readonly QueryPlanStep[] } }
    | { type: "whereNull" | "orWhereNull" | "whereNotNull" | "orWhereNotNull"; field: string }
    | { type: "orderBy" | "orderByDesc" | "groupBy"; field: string; aggregateType?: string }
    | { type: "limit"; value: number }
    | { type: "aggregate"; aggregateType: AggregateType; field?: string }
    | { type: "having"; aggregateType: AggregateType; field?: string; operator: QueryOperator; value: unknown }
    | { type: "disableWorkflow" | "disableAutoSysFields" | "forceUpdate" | "withAcls" | "withSecurityDataFilters" };

export type AggregateType = "avg" | "min" | "max" | "sum" | "count";
export type DataRow = Record<string, any>;
export type WhereStep = Extract<QueryPlanStep, { type: "where" | "orWhere" }>;
export type NullStep = Extract<QueryPlanStep, { type: "whereNull" | "orWhereNull" | "whereNotNull" | "orWhereNotNull" }>;
export type OrderStep = Extract<QueryPlanStep, { type: "orderBy" | "orderByDesc" | "groupBy" }>;
export type AggregateStep = Extract<QueryPlanStep, { type: "aggregate" }>;
export type HavingStep = Extract<QueryPlanStep, { type: "having" }>;

export class QueryEngine {
    static unwrap(value: any): any {
        return value instanceof MockGlideElement ? value.getValue() : value;
    }

    static read(row: DataRow, path?: string): any {
        if (!path) return undefined;
        return path.split(".").reduce((value, part) => {
            const unwrapped = QueryEngine.unwrap(value);
            if (unwrapped === null || unwrapped === undefined) return undefined;
            return unwrapped[part];
        }, row as any);
    }

    static evaluate(row: DataRow, field: string, operator: QueryOperator = "=", expected?: unknown): boolean {
        const actual = QueryEngine.unwrap(QueryEngine.read(row, field));
        const value = QueryEngine.unwrap(expected);
        switch (operator) {
            case "=": return actual == value;
            case "!=": return actual != value;
            case ">": return actual > value;
            case ">=": return actual >= value;
            case "<": return actual < value;
            case "<=": return actual <= value;
            case "IN": return (value as unknown[]).some((item) => actual == QueryEngine.unwrap(item));
            case "NOT IN": return !(value as unknown[]).some((item) => actual == QueryEngine.unwrap(item));
            case "STARTSWITH": return String(actual ?? "").startsWith(String(value));
            case "ENDSWITH": return String(actual ?? "").endsWith(String(value));
            case "CONTAINS": return String(actual ?? "").includes(String(value));
            case "DOES NOT CONTAIN": return !String(actual ?? "").includes(String(value));
            case "LIKE": return String(actual ?? "").includes(String(value));
            case "NOT LIKE": return !String(actual ?? "").includes(String(value));
            case "INSTANCEOF": return row.sys_class_name == value || row.className == value;
            case "SAMEAS": return actual == QueryEngine.unwrap(QueryEngine.read(row, String(value)));
            case "NSAMEAS": return actual != QueryEngine.unwrap(QueryEngine.read(row, String(value)));
            case "GT_FIELD": return actual > QueryEngine.unwrap(QueryEngine.read(row, String(value)));
            case "LT_FIELD": return actual < QueryEngine.unwrap(QueryEngine.read(row, String(value)));
            case "GT_OR_EQUALS_FIELD": return actual >= QueryEngine.unwrap(QueryEngine.read(row, String(value)));
            case "LT_OR_EQUALS_FIELD": return actual <= QueryEngine.unwrap(QueryEngine.read(row, String(value)));
            case "BETWEEN": {
                const [lower, upper] = value as any[];
                return actual >= lower && actual <= upper;
            }
            case "EMPTYSTRING": return actual === "";
            case "ANYTHING": return true;
        }
    }

    static matches(row: DataRow, plan: readonly QueryPlanStep[]): boolean {
        const clauses = plan.filter((step) =>
            ["where", "orWhere", "whereNull", "orWhereNull", "whereNotNull", "orWhereNotNull"].includes(step.type)
        ) as (WhereStep | NullStep)[];
        let result: boolean | undefined;
        for (const step of clauses) {
            const isOr = step.type.startsWith("or");
            let matched: boolean;
            if ("query" in step && step.query) {
                matched = QueryEngine.matches(row, step.query.plan);
            } else if (step.type !== "where" && step.type !== "orWhere") {
                const value = QueryEngine.unwrap(QueryEngine.read(row, step.field));
                matched = step.type.includes("NotNull") ? value !== null && value !== undefined : value === null || value === undefined;
            } else {
                matched = QueryEngine.evaluate(row, step.field!, step.operator, step.value);
            }
            result = result === undefined ? matched : isOr ? result || matched : result && matched;
        }
        return result ?? true;
    }

    static execute(rows: readonly DataRow[], plan: readonly QueryPlanStep[]): DataRow[] {
        let result = rows.filter((row) => QueryEngine.matches(row, plan));
        const orders = plan.filter((step) =>
            step.type === "orderBy" || step.type === "orderByDesc"
        ) as OrderStep[];
        result = [...result].sort((left, right) => {
            for (const order of orders) {
                const a = QueryEngine.unwrap(QueryEngine.read(left, order.field));
                const b = QueryEngine.unwrap(QueryEngine.read(right, order.field));
                const comparison = a == b ? 0 : a > b ? 1 : -1;
                if (comparison) return order.type === "orderByDesc" ? -comparison : comparison;
            }
            return 0;
        });
        const limit = plan.find((step): step is Extract<QueryPlanStep, { type: "limit" }> => step.type === "limit");
        return limit ? result.slice(0, limit.value) : result;
    }

    static project(row: DataRow, fields: readonly string[]): DataRow {
        if (!fields.length) return Object.fromEntries(Object.entries(row).map(([key, value]) => [key, QueryEngine.unwrap(value)]));
        const result: DataRow = {};
        for (const field of new Set([...fields, "sys_id"])) {
            if (field.includes("$")) throw new Error(`Metadata field flags are not supported by the mock: ${field}`);
            result[field] = QueryEngine.unwrap(QueryEngine.read(row, field));
        }
        return result;
    }

    static aggregate(rows: readonly DataRow[], type: AggregateType, field?: string): number | any {
        if (type === "count") return rows.length;
        const values = rows.map((row) => QueryEngine.unwrap(QueryEngine.read(row, field))).filter((value) => value !== null && value !== undefined);
        if (!values.length) return undefined;
        if (type === "min") return values.reduce((a, b) => a < b ? a : b);
        if (type === "max") return values.reduce((a, b) => a > b ? a : b);
        const total = values.reduce((sum, value) => sum + Number(value), 0);
        return type === "avg" ? total / values.length : total;
    }
}
