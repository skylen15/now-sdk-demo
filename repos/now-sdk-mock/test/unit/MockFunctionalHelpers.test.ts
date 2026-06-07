import { MockOptional } from "../../src/@servicenow/glide/MockOptional.js";
import { MockStream } from "../../src/@servicenow/glide/MockStream.js";

describe("MockOptional", () => {
    it("supports mapping, filtering, flat mapping, and defaults", () => {
        expect(MockOptional.of(2).map((value) => value * 2).filter((value) => value === 4).get()).toBe(4);
        expect(MockOptional.of(2).flatMap((value) => MockOptional.of(String(value))).get()).toBe("2");
        expect(MockOptional.empty<number>().orElse(3)).toBe(3);
        expect(() => MockOptional.empty().get()).toThrow("empty Optional");
    });

    it("evaluates lazy values once", () => {
        let calls = 0;
        const optional = MockOptional.lazy(() => ++calls);
        expect(optional.get()).toBe(1);
        expect(optional.get()).toBe(1);
    });
});

describe("MockStream", () => {
    it("supports lazy transformations and terminal operations", () => {
        expect(MockStream.fromArray([1, 2, 3]).map((value) => value * 2).filter((value) => value > 2).toArray()).toEqual([4, 6]);
        expect(MockStream.fromArray([1, 2, 3]).reduce((sum, value) => sum + value, 0)).toBe(6);
        expect(MockStream.fromArray([1, 2, 3]).some((value) => value === 2)).toBe(true);
        expect(MockStream.fromArray([1, 2, 3]).every((value) => value > 0)).toBe(true);
    });

    it("supports chunks, flatMap, find, and zip", () => {
        expect(MockStream.fromArray([1, 2, 3]).chunk(2).toArray()).toEqual([[1, 2], [3]]);
        expect(MockStream.fromArray([1, 2]).flatMap((value) => MockStream.fromArray([value, value])).toArray()).toEqual([1, 1, 2, 2]);
        expect(MockStream.fromArray([1, 2]).find((value) => value === 2).get()).toBe(2);
        expect(MockStream.zip((left, right) => left + right, MockStream.fromArray([1]), MockStream.fromArray([2])).toArray()).toEqual([3]);
    });
});
