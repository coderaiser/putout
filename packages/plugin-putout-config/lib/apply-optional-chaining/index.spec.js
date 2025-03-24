import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-optional-chaining', plugin],
    ],
});

test('putout-config: apply-optional-chaining: report', (t) => {
    t.report('apply-optional-chaining', `Rename property: 'convert-optional-to-logical/assign' -> 'optional-chaining/convert-optional-assign-to-logical'`);
    t.end();
});

test('putout-config: apply-optional-chaining: transform', (t) => {
    t.transform('apply-optional-chaining');
    t.end();
});
