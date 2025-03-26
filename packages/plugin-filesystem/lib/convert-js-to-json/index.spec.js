import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-js-to-json', plugin],
    ],
});

test('@putout/plugin-filesystem: convert-js-to-json: report', (t) => {
    t.reportWithOptions('convert-js-to-json', `Convert '*.js' to '*.json'`, {
        filename: 'package.js',
    });
    t.end();
});

test('@putout/plugin-filesystem: convert-js-to-json: transform', (t) => {
    t.transformWithOptions('convert-js-to-json', {
        filename: 'package.js',
    });
    t.end();
});

test('@putout/plugin-filesystem: convert-js-to-json: transform: cjs', (t) => {
    t.transformWithOptions('cjs', {
        filename: 'package.js',
    });
    t.end();
});

test('@putout/plugin-filesystem: convert-js-to-json: transform: strict', (t) => {
    t.transformWithOptions('strict', {
        filename: 'package.js',
    });
    t.end();
});
