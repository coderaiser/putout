import {test} from 'supertape';
import {createMockImport} from 'mock-import';

const {stopAll} = createMockImport(import.meta.url);
const {mockImport} = createMockImport(import.meta.url);
const {reImport} = createMockImport(import.meta.url);

test('test: remove', async (t) => {
    const read = await reImport('./read.js');
    
    mockImport('node:fs/promises', {
        readFile,
    });
    stopAll();
    t.equal(result, expected);
    t.end();
});
