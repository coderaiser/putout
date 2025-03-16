'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-report', plugin],
    ],
});

test('putout: apply-report: report', (t) => {
    t.report('apply-report', `Use 'noReportWithOptions()' instead of 'noReport()'`);
    t.end();
});

test('putout: apply-report: transform', (t) => {
    t.transform('apply-report');
    t.end();
});

test('putout: apply-report: report: no-report', (t) => {
    t.report('no-report', `Use 't.noReport(__a)' instead of 't.noReport(__a, "__b")'`);
    t.end();
});
