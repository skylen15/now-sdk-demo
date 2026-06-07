import { GlideRecord } from "@servicenow/glide";

export interface MockEventQueueEntry {
    eventName: string;
    instance: GlideRecord;
    parm1: string;
    parm2: string;
    queue: string;
}

export class EventQueue{
    private static _instance:EventQueue;

    public static getInstance():EventQueue{
        if(!EventQueue._instance){
            EventQueue._instance = new EventQueue();
        }
        return EventQueue._instance;
    }

    private _queue: MockEventQueueEntry[] = [];

    public static reset(): void {
        EventQueue.getInstance()._queue = [];
    }

    public get entries(): readonly MockEventQueueEntry[] {
        return this._queue;
    }

    public eventQueue(eventName:string, instance:GlideRecord, parm1:string, parm2:string, queue:string) : void{
        this._queue.push({ eventName, instance, parm1, parm2, queue });
    }
}
