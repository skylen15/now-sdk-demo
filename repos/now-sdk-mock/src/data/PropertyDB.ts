import { PropertyTable } from "./PropertyTable.js";

export class PropertyDB{
    private static _instance:PropertyDB;
     public static getInstance():PropertyDB{
          if(!PropertyDB._instance){
            PropertyDB._instance = new PropertyDB();
          }
          return PropertyDB._instance;
     }

     public static reset(): void {
        PropertyDB.getInstance()._propertiesTable = new PropertyTable();
     }

     private _propertiesTable:PropertyTable;

     public constructor(){
        this._propertiesTable = new PropertyTable();
    }

     
    public getProperty(propertyName: string): any {
        return this._propertiesTable.getProperty(propertyName);
    }

    public setProperty(propertyName: string, value: string): void {
        this._propertiesTable.setProperty(propertyName, value);
    }
}
