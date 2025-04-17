import {createTest} from '@putout/test';
import * as applyAsTypeAssertions from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/apply-as-type-assertions', applyAsTypeAssertions],
    ],
});

test('plugin-apply-as-type-assertiong: report: assertion', (t) => {
    t.report('assertion', '"as" should be used for type assertions');
    t.end();
});

test('plugin-apply-as-type-assertiong: transform: assertion', (t) => {
    t.transform('assertion');
    t.end();
});
