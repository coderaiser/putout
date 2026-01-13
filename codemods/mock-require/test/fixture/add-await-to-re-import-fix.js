import {createMockImport} from 'mock-import';

const {reImport} = createMockImport(import.meta.url);

async () => {
    await reImport('x');
};

await reImport('x');
