export class MockOptional<T> {
    private fetched = false;
    private value: T | null | undefined;

    constructor(value?: T | null, private readonly lazyGet?: () => T | null | undefined, private readonly reason?: string) {
        this.value = value;
    }

    private resolve(): T | null | undefined {
        if (this.lazyGet && !this.fetched) {
            this.value = this.lazyGet();
            this.fetched = true;
        }
        return this.value;
    }

    map<U>(fn: (value: T) => U): MockOptional<U> {
        if (!fn) throw new Error("map expects a mapping function of type A -> B");
        return this.isEmpty() ? MockOptional.empty<U>() : MockOptional.of(fn(this.resolve() as T));
    }

    flatMap<U>(fn: (value: T) => MockOptional<U>): MockOptional<U> {
        if (!fn) throw new Error("Optional.flatMap expects a mapping function of type A -> Optional<B>");
        if (this.isEmpty()) return MockOptional.empty<U>();
        const result = fn(this.resolve() as T);
        if (!(result instanceof MockOptional)) throw new Error("Optional.flatMap expects a mapping function of type A -> Optional<B>");
        return result;
    }

    get(): T {
        if (this.isPresent()) return this.resolve() as T;
        throw new Error(`get() called on empty Optional${this.reason ? `: ${this.reason}` : ""}`);
    }

    orElse(defaultValue: T): T { return this.isPresent() ? this.resolve() as T : defaultValue; }
    isEmpty(): boolean { return !this.isPresent(); }
    isPresent(): boolean { const value = this.resolve(); return value !== null && value !== undefined; }
    ifPresent(fn: (value: T) => void): void { if (!fn) throw new Error("ifPresent expects a function"); if (this.isPresent()) fn(this.resolve() as T); }
    filter(predicate: (value: T) => boolean): MockOptional<T> {
        if (!predicate) throw new Error("filter expects a predicate function");
        return this.isEmpty() || predicate(this.resolve() as T) ? this : MockOptional.empty<T>();
    }
    toString(): string { return this.isEmpty() ? `Optional.empty${this.reason ? `: ${this.reason}` : ""}` : `Optional<${this.resolve()}>`; }

    static empty<T>(reason?: string): MockOptional<T> { return new MockOptional<T>(null, undefined, reason); }
    static of<T>(value: T): MockOptional<T> {
        if (value === null || value === undefined) throw new Error("Optional.of() does not allow undefined or null values. Use Optional.empty() instead.");
        return new MockOptional(value);
    }
    static lazy<T>(lazyGet: () => T | null | undefined): MockOptional<T> { return new MockOptional<T>(null, lazyGet); }
}
