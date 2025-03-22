import {createTest} from '@putout/test';
import * as nodejs from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'nodejs/rename-file-mjs-to-js': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: rename-file-mjs-to-js: report', (t) => {
    t.report('rename-file-mjs-to-js', `Rename '/lib/hello.mjs' to '/lib/hello.js'`);
    t.end();
});

test('plugin-nodejs: rename-file-mjs-to-js: transform', (t) => {
    t.transform('rename-file-mjs-to-js');
    t.end();
});
