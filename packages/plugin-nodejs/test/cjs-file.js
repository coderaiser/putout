import {createTest} from '@putout/test';
import * as nodejs from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'nodejs/cjs-file': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: cjs-file: report', (t) => {
    t.report('cjs-file', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('plugin-nodejs: cjs-file: transform: export', (t) => {
    t.transform('cjs-file');
    t.end();
});
