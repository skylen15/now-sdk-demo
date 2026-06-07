import { MockGlideRecord } from "./MockGlideRecord.js";
import { fn } from "jest-mock";

export class MockGlideAggregate extends MockGlideRecord{

    private _groupBy:string | null = null;
    public get groupByVal():string | null{
        return this._groupBy;
    }
    public set groupByVal(value:string){
        this._groupBy = value;
    }

    groupBy = fn().mockImplementation((column: unknown) => {
        this.groupByVal = String(column);
        return this;
    });
}
