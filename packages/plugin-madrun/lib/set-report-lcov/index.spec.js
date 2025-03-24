import {createTest} from '@putout/test';
import * as setReportLcov from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-report-lcov', setReportLcov],
    ],
});

test('madrun: set-report-lcov: report', (t) => {
    t.report('report', 'Report should use "lcov" instead of "text-lcov"');
    t.end();
});

test('madrun: set-report-lcov: transform: transform', (t) => {
    t.transform('report');
    t.end();
});

test('madrun: set-report-lcov: no report: no-report', (t) => {
    t.noReport('no-report');
    t.end();
});
