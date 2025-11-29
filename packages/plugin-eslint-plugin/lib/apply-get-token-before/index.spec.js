import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-get-token-before', plugin],
    ],
});

test('eslint-plugin: apply-get-token-before: report', (t) => {
    t.report('apply-get-token-before', `Use 'getTokenBefore' instead of 'getTokenOrCommentBefore'`);
    t.end();
});

test('eslint-plugin: apply-get-token-before: transform', (t) => {
    t.transform('apply-get-token-before');
    t.end();
});
