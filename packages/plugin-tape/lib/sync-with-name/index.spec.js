import {createTest} from '@putout/test';
import * as syncWithName from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/sync-with-name', syncWithName],
    ],
});

test('plugin-tape: sync-with-name: report', (t) => {
    t.reportCode(`const a = stub().withName('b')`, `'stub().withName(name)' should synced with variable name`);
    t.end();
});

test('plugin-tape: sync-with-name: transform: not-synced', (t) => {
    t.transformCode(`const a = stub().withName('b')`, `const a = stub().withName('b');\n`);
    t.end();
});

test('plugin-tape: sync-with-name: transform: synced', (t) => {
    t.noTransformCode(`const a = stub().withName('a');\n`);
    t.end();
});
