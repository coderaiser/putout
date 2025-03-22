import {createTest} from '@putout/test';
import * as nodejs from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'nodejs/mjs-file': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: mjs-file: report', (t) => {
    t.report('mjs-file', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('plugin-nodejs: mjs-file: transform: export', (t) => {
    t.transform('mjs-file');
    t.end();
});
