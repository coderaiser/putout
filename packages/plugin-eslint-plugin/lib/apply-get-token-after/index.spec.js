import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-get-token-after', plugin],
    ],
});

test('eslint-plugin: apply-get-token-after: report', (t) => {
    t.report('apply-get-token-after', `Use 'getTokenAfter' instead of 'getTokenOrCommentAfter'`);
    t.end();
});

test('eslint-plugin: apply-get-token-after: transform', (t) => {
    t.transform('apply-get-token-after');
    t.end();
});
