import { mockGs } from "../@servicenow/glide/MockGlideSystem.js";
import { MockScopedCacheManager } from "../cache/MockScopedCacheManager.js";
import { initSnRhinoEnvironment } from "../config/sn_js/initSNRhinoEnvironment.js";
import { Database } from "../data/Database.js";
import { EventQueue } from "../data/EventQueue.js";
import { PropertyDB } from "../data/PropertyDB.js";
import { RESTDataStore } from "../data/sn_ws/RESTDataStore.js";
import { SNTestEnvironment } from "./SNTestEnvironment.js";

/**
 * Restores all process-local mock state while preserving exported singleton identities.
 */
export function resetMockState(): void {
    Database.reInitialize();
    PropertyDB.reset();
    EventQueue.reset();
    RESTDataStore.reset();
    MockScopedCacheManager.reset();
    SNTestEnvironment.reset();
    mockGs.reset();
    initSnRhinoEnvironment();
}
