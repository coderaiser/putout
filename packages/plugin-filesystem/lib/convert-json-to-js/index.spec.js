import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-json-to-js', plugin],
    ],
});

test('eslint: convert-json-to-js: report', (t) => {
    t.reportWithOptions('convert-json-to-js', `Convert '*.json' to '*.js'`, {
        filename: 'package.json',
    });
    t.end();
});

test('eslint: convert-json-to-js: transform', (t) => {
    t.transformWithOptions('convert-json-to-js', {
        filename: 'package.json',
    });
    t.end();
});
