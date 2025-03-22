import {createTest} from '@putout/test';
import declareBeforeReference from '@putout/plugin-declare-before-reference';
import reuseDuplicateInit from '@putout/plugin-reuse-duplicate-init';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['group-require-by-id', plugin],
    ],
});

test('nodejs: group-require-by-id: report', (t) => {
    t.report('group-require-by-id', `Group require by id`);
    t.end();
});

test('nodejs: group-require-by-id: no report: grouped', (t) => {
    t.noReport('grouped');
    t.end();
});

test('nodejs: group-require-by-id: no report: not-top-level', (t) => {
    t.noReport('not-top-level');
    t.end();
});

test('nodejs: group-require-by-id: transform', (t) => {
    t.transform('group-require-by-id');
    t.end();
});

test('nodejs: group-require-by-id: transform: comments', (t) => {
    t.transform('comments');
    t.end();
});

test('plugin-nodejs: group-require-by-id: no report after transform: declare-before-reference', (t) => {
    t.noReportAfterTransform('declare-before-reference', {
        'declare-before-reference': declareBeforeReference,
        'reuse-duplicate-init': reuseDuplicateInit,
    });
    t.end();
});
