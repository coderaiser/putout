import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-types', plugin],
    ],
});

test('putout-config: apply-types: report', (t) => {
    t.report('apply-types', `Rename property: 'convert-typeof-to-is-type' -> 'types/convert-typeof-to-is-type'`);
    t.end();
});

test('putout-config: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});
