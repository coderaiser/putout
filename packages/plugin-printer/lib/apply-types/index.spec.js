import {createTest} from '@putout/test';
import * as declareBeforeReference from '@putout/plugin-declare-before-reference';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-types', plugin],
    ],
});

test('printer: apply-types: report', (t) => {
    t.report('apply-types', `require: ('@putout/babel') -> ('putout/babel').types`);
    t.end();
});

test('printer: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});

test('printer: apply-types: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('printer: apply-types: no report: no-pattern', (t) => {
    t.noReport('no-pattern');
    t.end();
});

test('printer: apply-types: no report: traverse', (t) => {
    t.noReport('traverse');
    t.end();
});

test('printer: apply-types: no report after transform: declare-before-reference', (t) => {
    t.noReportAfterTransform('declare-before-reference', {
        'apply-types': plugin,
        'declare-before-reference': declareBeforeReference,
        'remove-nested-blocks': removeNestedBlocks,
    });
    t.end();
});
