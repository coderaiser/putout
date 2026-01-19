import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-require', plugin],
    ],
});

test('putout: nodejs: apply-privately-required-file: get-require: report: get-require', (t) => {
    t.report('get-require', `./a.js`);
    t.end();
});

test('putout: nodejs: apply-privately-required-file: get-require: no report: external', (t) => {
    t.noReportCode(`const a = require('a')`);
    t.end();
});

test('putout: nodejs: apply-privately-required-file: get-require: no report: not string', (t) => {
    t.noReportCode(`const a = require(b)`);
    t.end();
});

test('putout: nodejs: apply-privately-required-file: get-require: report: js', (t) => {
    t.reportCode(`const a = require('./a.mjs')`, './a.mjs');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: get-require: report: cjs', (t) => {
    t.reportCode(`const a = require('./a.cjs')`, './a.cjs');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: no transform: get-require', (t) => {
    t.noTransform('get-require');
    t.end();
});
