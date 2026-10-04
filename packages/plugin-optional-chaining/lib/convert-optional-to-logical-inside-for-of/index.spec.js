import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-optional-to-logical-inside-for-of', plugin],
    ],
});

test('optional-chaining: convert-optional-to-logical-inside-for-of: report', (t) => {
    t.report('convert-optional-to-logical-inside-for-of', `Use Logical Expression instead of Optional Chaining`);
    t.end();
});

test('optional-chaining: convert-optional-to-logical-inside-for-of: transform', (t) => {
    t.transform('convert-optional-to-logical-inside-for-of');
    t.end();
});
