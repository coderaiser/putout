import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-is-space-between', plugin],
    ],
});

test('eslint-plugin: apply-is-space-between: report', (t) => {
    t.report('apply-is-space-between', `Use 'isSpaceBetween' instead of 'isSpaceBetweenTokens'`);
    t.end();
});

test('eslint-plugin: apply-is-space-between: transform', (t) => {
    t.transform('apply-is-space-between');
    t.end();
});
