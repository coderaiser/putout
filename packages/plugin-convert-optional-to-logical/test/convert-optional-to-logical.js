import {createTest} from '@putout/test';
import * as plugin from '../lib/convert-optional-to-logical.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-optional-to-logical', plugin],
    ],
});

test('plugin-for-of: transform: convert-optional-to-logical: report', (t) => {
    t.report('convert-optional-to-logical', 'Use Logical Expression instead of Optional Chaining');
    t.end();
});

test('plugin-for-of: transform: convert-optional-to-logical', (t) => {
    t.transform('convert-optional-to-logical');
    t.end();
});
