import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-arguments', plugin],
    ],
});

test('putout-config: apply-arguments: report', (t) => {
    t.report('apply-arguments', `Rename property: 'remove-useless-arguments' -> 'arguments'`);
    t.end();
});

test('putout-config: apply-arguments: transform', (t) => {
    t.transform('apply-arguments');
    t.end();
});
