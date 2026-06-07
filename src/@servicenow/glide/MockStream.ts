import { MockOptional } from "./MockOptional.js";

export class MockStream<T> {
    private static readonly END = Symbol("MockStream.END");
    constructor(private readonly nextFn: () => T | typeof MockStream.END) {}

    limit(count: number): MockStream<T> {
        let index = 0;
        return new MockStream(() => index++ >= count ? MockStream.END : this.nextFn());
    }
    chunk(count: number): MockStream<T[]> {
        if (!Number.isInteger(count) || count < 1) throw new Error("Stream.chunk expects a positive integer argument");
        return new MockStream(() => {
            const result: T[] = [];
            while (result.length < count) {
                const value = this.nextFn();
                if (value === MockStream.END) break;
                result.push(value as T);
            }
            return result.length ? result : MockStream.END;
        });
    }
    map<U>(fn: (value: T) => U): MockStream<U> {
        if (!fn) throw new Error("Stream.map expects a mapping function of type A -> B");
        return new MockStream(() => {
            const value = this.nextFn();
            return value === MockStream.END ? MockStream.END : fn(value as T);
        });
    }
    flatMap<U>(fn: (value: T) => MockStream<U>): MockStream<U> {
        let inner: MockStream<U> | undefined;
        return new MockStream(() => {
            while (true) {
                if (inner) {
                    const value = inner.nextFn();
                    if (value !== MockStream.END) return value;
                }
                const outer = this.nextFn();
                if (outer === MockStream.END) return MockStream.END;
                inner = fn(outer as T);
                if (!(inner instanceof MockStream)) throw new Error("flatMap expects a fn which returns a Stream");
            }
        });
    }
    filter(predicate: (value: T) => boolean): MockStream<T> {
        return new MockStream(() => {
            let value = this.nextFn();
            while (value !== MockStream.END && !predicate(value as T)) value = this.nextFn();
            return value;
        });
    }
    find(predicate?: (value: T) => boolean): MockOptional<T> {
        let value = this.nextFn();
        while (value !== MockStream.END) {
            if (!predicate || predicate(value as T)) return MockOptional.of(value as T);
            value = this.nextFn();
        }
        return MockOptional.empty();
    }
    some(predicate: (value: T) => boolean): boolean { return this.find(predicate).isPresent(); }
    every(predicate: (value: T) => boolean): boolean { return !this.find((value) => !predicate(value)).isPresent(); }
    toArray(count = 100): T[] {
        if (!Number.isInteger(count) || count < 1 || count > 100) throw new Error("Stream.toArray expects a positive integer argument <= 100");
        const result: T[] = [];
        while (result.length < count) {
            const value = this.nextFn();
            if (value === MockStream.END) break;
            result.push(value as T);
        }
        return result;
    }
    reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U {
        let result = initialValue;
        this.forEach((value) => { result = reducer(result, value); });
        return result;
    }
    forEach(fn: (value: T) => void): void {
        let value = this.nextFn();
        while (value !== MockStream.END) { fn(value as T); value = this.nextFn(); }
    }
    toString(): string { return "Stream"; }

    static fromArray<T>(values: readonly T[]): MockStream<T> {
        let index = 0;
        return new MockStream(() => index >= values.length ? MockStream.END : values[index++]);
    }
    static zip<T extends readonly unknown[], U>(fn: (...values: T) => U, ...streams: { [K in keyof T]: MockStream<T[K]> }): MockStream<U> {
        return new MockStream(() => {
            const values = streams.map((stream) => stream.nextFn());
            return values.some((value) => value === MockStream.END) ? MockStream.END : fn(...values as unknown as T);
        });
    }
}
