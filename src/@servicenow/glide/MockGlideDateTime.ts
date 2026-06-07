import { GlideDateTime } from "@servicenow/glide";
import { MockGlideDate } from "./MockGlideDate.js";
import { MockGlideTime } from "./MockGlideTime.js";
import { parseISO } from "date-fns/parseISO";
import { DBUtil } from "../../common/DBUtil.js";
import { fn } from "jest-mock";

export class MockGlideDateTime{

    private _dateInstance: Date = new Date();
    public get dateInstance(): Date {
        return this._dateInstance;
    }
    public set dateInstance(value: Date) {
        this._dateInstance = value;
    }

    public constructor(dt?:string | number | null){

        if(dt == undefined || !dt){
            this._dateInstance = new Date(Date.now());
        }else{
            DBUtil.tryParseInt(dt?.toString(), (isParsed:boolean, value:number | undefined) => {
                if(isParsed != undefined && isParsed){
                    this._dateInstance = new Date();
                    this._dateInstance.setUTCMilliseconds(value as unknown as number);
                }else{
                    this._dateInstance = (dt == undefined || !dt) ? new Date(Date.now()) : parseISO(dt.toString());
                }
            });
    
        }

    }

    getTime = fn().mockImplementation(() => {
        return new MockGlideTime(this.dateInstance);
    });
    getDate = fn().mockImplementation(() => {
        return new MockGlideDate(this.dateInstance);
    });
    getNumericValue= fn().mockImplementation(() => {
        return this.dateInstance.getTime();
    } )
    getYearLocalTime= fn(() => this.dateInstance.getFullYear())
    getMonthLocalTime= fn(() => this.dateInstance.getMonth() + 1)
    getDayOfMonthLocalTime= fn(() => this.dateInstance.getDate())
    getYearUTC= fn(() => this.dateInstance.getUTCFullYear())
    getMonthUTC= fn(() => this.dateInstance.getUTCMonth() + 1)
    getDayOfMonthUTC= fn(() => this.dateInstance.getUTCDate())
    addDays= fn()
    addSeconds= fn((val:number) => {
        this.dateInstance.setSeconds(this.dateInstance.getSeconds() + val);
    })
    add= fn((val:number) => {
        this.dateInstance.setTime(this.dateInstance.getTime() + val);
    })
    toString =  fn(() => {
        // const zonedDate = toZonedTime(_dt, 'UTC');
        
        // const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.000'Z'");
        
        // return formattedDate; 
        //toString in ServiceNow does not return the ISO String
        return this.dateInstance.toISOString();
        
    })
} 


export function newMockGlideDateTime(dt?:string | number | null):GlideDateTime{
    return new MockGlideDateTime(dt) as unknown as GlideDateTime;
}
