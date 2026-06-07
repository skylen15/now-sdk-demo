import { GlideElementUtil } from '../../src/common/GlideElementUtil.js';
import { MockGlideElement } from '../../src/@servicenow/glide/MockGlideElement.js';
import { MockGlideRecord } from '../../src/@servicenow/glide/MockGlideRecord.js';
import { Database } from '../../src/data/Database.js';
import { SNTestEnvironment } from '../../src/common/SNTestEnvironment.js';
import * as path from 'path';
import { fileURLToPath } from 'node:url';

const glideDeclarationPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'glide.server.d.ts');
SNTestEnvironment.getInstance().init(false, path.dirname(glideDeclarationPath), path.basename(glideDeclarationPath));

describe('GlideElementUtil', () => {
    beforeEach(() => {
        Database.reInitialize();
    });

    describe('createGlideElementReference', () => {
        it('should create a MockGlideElement with reference data', () => {
            const refData = [{ sys_id: 'user1', name: 'John' }];
            const elem = GlideElementUtil.createGlideElementReference('caller_id', 'sys_user', refData);

            expect(elem).toBeInstanceOf(MockGlideElement);
        });
    });

    describe('createGlideElementReferenceForGlideRecord', () => {
        it('should create a MockGlideElement referencing a GlideRecord', () => {
            Database.getInstance().addTable('sys_user');
            const gr = new MockGlideRecord('sys_user');

            const elem = GlideElementUtil.createGlideElementReferenceForGlideRecord('caller_id', gr);

            expect(elem).toBeInstanceOf(MockGlideElement);
            expect(elem.getRefRecord()).toBeDefined();
        });
    });
});
