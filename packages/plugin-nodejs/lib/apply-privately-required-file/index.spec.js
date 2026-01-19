import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-privately-required-file', plugin],
    ],
});

test('putout: nodejs: apply-privately-required-file: report', (t) => {
    t.report('apply-privately-required-file', `Apply privately required source: '../is.js' -> '#is'`);
    t.end();
});

test('putout: nodejs: apply-privately-required-file: transform', (t) => {
    t.transform('apply-privately-required-file');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: transform: first-no-private', (t) => {
    t.transform('first-no-private');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: no report: broken-package', (t) => {
    t.noReport('broken-package');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: no report: no-imports', (t) => {
    t.noReport('no-imports');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: transform: same-directory', (t) => {
    t.transform('same-directory');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: transform: no-default', (t) => {
    t.transform('no-default');
    t.end();
});
