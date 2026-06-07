



```
import { MockGlideRecord, MockGlideSystem, Database, DataTableBusinessRule, BusinessRuleRunType, initSnRhinoEnvironment, BusinessRuleRunWhen, resetMockState } from '@kobidev/now-sdk-mock';
import { expect, it, describe, beforeEach, jest } from '@jest/globals';

initSNRhinoEnvironment();


describe("IncidentUtil", () => {
    let tblIncident;

    beforeEach(() => {
        resetMockState();

         tblIncident = Database.getInstance().addTable('incident');
        
         
        
        let querySpy = jest.spyOn(MockGlideRecord.prototype, 'query');

        jest.spyOn(MockGlideRecord.prototype, 'query').mockImplementation((val) => {
            const hash = crypto.createHash('md5').update(val).digest('base64');
            return hash;
        });

        expect(querySpy).toHaveBeenCalled();
       
        
    
    });
});


```
