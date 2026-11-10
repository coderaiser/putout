import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-colon-to-type-checker', plugin],
    ],
});

test('printer: add-missing-colon-to-type-checker: report', (t) => {
    t.report('add-missing-colon-to-type-checker', `Add missing colon: '+ -> !' -> '+: -> !'`);
    t.end();
});

test('printer: add-missing-colon-to-type-checker: transform', (t) => {
    t.transform('add-missing-colon-to-type-checker');
    t.end();
});

test('printer: add-missing-colon-to-type-checker: no report: single', (t) => {
    t.noReport('single');
    t.end();
});
