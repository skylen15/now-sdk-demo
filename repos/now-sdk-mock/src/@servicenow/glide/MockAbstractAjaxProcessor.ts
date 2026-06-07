import { fn } from "jest-mock";

export class MockAbstractAjaxProcessor {
    private CALLABLE_PREFIX: string;
    private request: any;
    private responseXML: any;
    private gc: any;

    constructor(request?: any, responseXML?: any, gc?: any) {
        this.CALLABLE_PREFIX = "";
        this.request = request;
        this.responseXML = responseXML;
        this.gc = gc;
    }

    public process = fn().mockImplementation(() => {
        return "";
    });

    public newItem = fn().mockImplementation((name: unknown) => {
        return {};
    });

    public getParameter = fn().mockImplementation((name: unknown) => {
        return "";
    });

    public getDocument = fn().mockImplementation(() => {
        return {};
    });

    public getRootElement = fn().mockImplementation(() => {
        return {};
    });

    public getName = fn().mockImplementation(() => {
        return "";
    });

    public getValue = fn().mockImplementation(() => {
        return "";
    });

    public getType = fn().mockImplementation(() => {
        return "";
    });

    public getChars = fn().mockImplementation(() => {
        return "";
    });

    public setAnswer = fn().mockImplementation((value: unknown) => {
        // Do nothing
    });

    public setError = fn().mockImplementation((error: unknown) => {
        // Do nothing
    });

    type: string = "";
}
