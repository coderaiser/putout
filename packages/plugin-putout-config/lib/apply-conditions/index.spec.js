import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-conditions', plugin],
    ],
});

test('putout-config: apply-conditions: report', (t) => {
    t.report('apply-conditions', `Rename property: 'remove-useless-else' -> 'conditions/remove-useless-else'`);
    t.end();
});

test('putout-config: apply-conditions: transform', (t) => {
    t.transform('apply-conditions');
    t.end();
});

test('putout-config: apply-conditions: transform: v29', (t) => {
    t.transform('v29');
    t.end();
});
