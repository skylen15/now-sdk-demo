import { MockAbstractAjaxProcessor } from "../../@servicenow/glide/MockAbstractAjaxProcessor.js";
import { MockGlideAggregate } from "../../@servicenow/glide/MockGlideAggregate.js";
import { MockGlideDate } from "../../@servicenow/glide/MockGlideDate.js";
import { MockGlideDateTime } from "../../@servicenow/glide/MockGlideDateTime.js";
import { MockGlideElement } from "../../@servicenow/glide/MockGlideElement.js";
import { MockGlideQuery } from "../../@servicenow/glide/MockGlideQuery.js";
import { MockGlideQueryCondition } from "../../@servicenow/glide/MockGlideQueryCondition.js";
import { MockGlideRecord } from "../../@servicenow/glide/MockGlideRecord.js";
import { MockGlideSystem, mockGs } from "../../@servicenow/glide/MockGlideSystem.js";
import { MockGlideTime } from "../../@servicenow/glide/MockGlideTime.js";
import Class from "./PrototypeServer.js";

export function initSnRhinoEnvironment(): void {
    const target = globalThis as Record<string, any>;
    target.Class = Class;
    target.GlideRecord = MockGlideRecord;
    target.GlideElement = MockGlideElement;
    target.GlideDateTime = MockGlideDateTime;
    target.GlideQuery = MockGlideQuery;
    target.GlideQueryCondition = MockGlideQueryCondition;
    target.GlideAggregate = MockGlideAggregate;
    target.GlideDate = MockGlideDate;
    target.GlideTime = MockGlideTime;
    target.AbstractAjaxProcessor = MockAbstractAjaxProcessor;
    target.GlideSystem = MockGlideSystem;
    target.gs = mockGs;
}
