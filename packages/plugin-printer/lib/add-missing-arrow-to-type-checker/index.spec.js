import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-arrow-to-type-checker', plugin],
    ],
});

test('printer: add-missing-arrow-to-type-checker: report', (t) => {
    t.report('add-missing-arrow-to-type-checker', `Add missing arrow: '+: !' -> '+: -> !'`);
    t.end();
});

test('printer: add-missing-arrow-to-type-checker: transform', (t) => {
    t.transform('add-missing-arrow-to-type-checker');
    t.end();
});

test('printer: add-missing-arrow-to-type-checker: report: only-type', (t) => {
    t.report('only-type', `Add missing arrow: '+: ClassDeclaration' -> '+: -> ClassDeclaration'`);
    t.end();
});

test('printer: add-missing-arrow-to-type-checker: transform: only-type', (t) => {
    t.transform('only-type');
    t.end();
});
