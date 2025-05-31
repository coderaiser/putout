import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-consistent-blocks', plugin],
    ],
});

test('putout: apply-consistent-blocks: report', (t) => {
    t.report('apply-consistent-blocks', `Use consistent blocks`);
    t.end();
});

test('putout: apply-consistent-blocks: transform', (t) => {
    t.transform('apply-consistent-blocks');
    t.end();
});

test('putout: apply-consistent-blocks: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('putout: apply-consistent-blocks: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('putout: apply-consistent-blocks: no transform: nested-else', (t) => {
    t.noTransform('nested-else');
    t.end();
});

test('putout: apply-consistent-blocks: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});

test('putout: apply-consistent-blocks: no report: correct-count', (t) => {
    t.noReport('correct-count');
    t.end();
});

test('putout: apply-consistent-blocks: no report: empty', (t) => {
    t.noReport('empty');
    t.end();
});

test('putout: apply-consistent-blocks: no report: statement-inside-if', (t) => {
    t.noReport('statement-inside-if');
    t.end();
});

test('putout: apply-consistent-blocks: no report: couple-blocks', (t) => {
    t.noReport('couple-blocks');
    t.end();
});

test('putout: apply-consistent-blocks: no report: else-statement', (t) => {
    t.noReport('else-statement');
    t.end();
});

test('putout: apply-consistent-blocks: no report after transform: nested', (t) => {
    t.noReportAfterTransform('nested');
    t.end();
});
