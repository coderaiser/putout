import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert', plugin],
    ],
});

test('filesystem: convert: report', (t) => {
    t.report('convert', `Convert '*.js' to '*.json'`);
    t.end();
});

test('filesystem: convert: transform', (t) => {
    t.transform('convert');
    t.end();
});

test('filesystem: convert: transform: cjs', (t) => {
    t.transform('cjs');
    t.end();
});
