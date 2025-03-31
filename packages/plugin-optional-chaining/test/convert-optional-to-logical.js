import {createTest} from '@putout/test';
import * as plugin from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'optional-chaining/convert-optional-to-logical': 'on',
    },
    plugins: [
        ['optional-chaining', plugin],
    ],
});

test('plugin-optional-chaining: convert-optional-to-logical: report: call', (t) => {
    t.report('convert-optional-to-logical', 'Use Logical Expression instead of Optional Chaining');
    t.end();
});

test('plugin-optional-chaining: convert-optional-to-logical: transform: call', (t) => {
    t.transform('convert-optional-to-logical');
    t.end();
});
