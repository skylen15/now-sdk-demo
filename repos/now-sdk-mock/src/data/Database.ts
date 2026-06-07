import { InMemoryDataTable } from "./InMemoryDataTable.js";

export class Database{
    private static _instance:Database;
    public static getInstance():Database{
          if(!Database._instance){
               Database._instance = new Database();
          }
          return Database._instance;
     }
 
     public static reInitialize(): void {
         Database.getInstance()._mockData = {};
     }
 
     private _mockData:Record<string,InMemoryDataTable> = {};
 
     public getMockData():Record<string,InMemoryDataTable>{
         return this._mockData;
     }
 
     public addTable(tableName:string) : InMemoryDataTable{
         if(!this._mockData[tableName])
            this._mockData[tableName] = new InMemoryDataTable(tableName);
 
         return  this._mockData[tableName];
     }
 
     public getTable(tableName:string){
         return this._mockData[tableName];
     }
 }
