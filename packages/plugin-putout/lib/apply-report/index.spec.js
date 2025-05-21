import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-report', plugin],
    ],
});

test('putout: apply-report: report', (t) => {
    t.report('apply-report', `Use 't.noReportWithOptions()' instead of 't.noReport()'`);
    t.end();
});

test('putout: apply-report: transform', (t) => {
    t.transform('apply-report');
    t.end();
});

test('putout: apply-report: transform: no-report-three', (t) => {
    t.transform('no-report-three');
    t.end();
});

test('putout: apply-report: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('putout: apply-report: report: no-report-three', (t) => {
    t.report('no-report-three', `Use 't.noReportWithOptions(__a, __c)' instead of 't.noReportWithOptions(__a, __b, __c)'`);
    t.end();
});

test('putout: apply-report: report: no-report', (t) => {
    t.report('no-report', `Use 't.noReport(__a)' instead of 't.noReport(__a, __b)'`);
    t.end();
});

test('putout: apply-report: no report: no-report-with-plugins', (t) => {
    t.noReport('no-report-with-plugins');
    t.end();
});

test('putout: apply-report: report: with-options', (t) => {
    t.report('with-options', [`Use 't.noReportWithOptions()' instead of 't.noReport()'`]);
    t.end();
});

test('putout: apply-report: transform: object', (t) => {
    t.transform('object');
    t.end();
});
