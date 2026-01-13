import {createTest} from '@putout/test';
import * as mockRequire from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['mock-require', mockRequire],
    ],
});

test('plugin-mock-require: transform: add-stop-all', (t) => {
    t.transform('add-stop-all');
    t.end();
});

test('plugin-mock-require: transform: add-await-to-re-import', (t) => {
    t.transform('add-await-to-re-import');
    t.end();
});

test('plugin-mock-require: transform: add-node-prefix-to-mock-require', (t) => {
    t.transform('add-node-prefix-to-mock-require');
    t.end();
});
