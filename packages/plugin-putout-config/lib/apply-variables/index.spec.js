import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-variables', plugin],
    ],
});

test('putout-config: apply-variables: report', (t) => {
    t.report('apply-variables', `Rename property: 'remove-useless-variables' -> 'variables'`);
    t.end();
});

test('putout-config: apply-variables: transform', (t) => {
    t.transform('apply-variables');
    t.end();
});

test('putout-config: apply-variables: transform: schema', (t) => {
    t.transform('schema');
    t.end();
});
