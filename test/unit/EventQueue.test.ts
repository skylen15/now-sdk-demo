import { EventQueue } from '../../src/data/EventQueue.js';
import { resetMockState } from '../../src/common/resetMockState.js';

describe('EventQueue', () => {
    beforeEach(resetMockState);

    it('should be a singleton', () => {
        const eq1 = EventQueue.getInstance();
        const eq2 = EventQueue.getInstance();
        expect(eq1).toBe(eq2);
    });

    it('should not throw when calling eventQueue', () => {
        const eq = EventQueue.getInstance();
        expect(() => {
            eq.eventQueue('my.event', null as any, 'p1', 'p2', 'queue_name');
        }).not.toThrow();
        expect(eq.entries).toEqual([
            expect.objectContaining({ eventName: 'my.event', parm1: 'p1', parm2: 'p2', queue: 'queue_name' }),
        ]);
    });
});
