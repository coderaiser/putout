import {test} from 'supertape';
import {createMockImport} from 'mock-import';

const {
    stopAll
} = createMockImport(import.meta.url);

const {
    reImport
} = createMockImport(import.meta.url);

const {
    reRequire
} = mockRequire;

const {
    mockImport
} = createMockImport(import.meta.url);

const mockRequire = require('mock-require');

test('cloudcmd: rest: move', async (t) => {
    mockImport('fs', unionFS);

    await reImport('@cloudcmd/rename-files');
    await reImport('@cloudcmd/move-files');
    await reImport(restPath);

    stopAll();
    t.end();
});

