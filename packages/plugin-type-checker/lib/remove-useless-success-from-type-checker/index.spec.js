import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-success-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-success-from-type-checker: report', (t) => {
    t.report('remove-useless-success-from-type-checker', `Merge useless success route with fail route: '-: node.properties.0 -> !ObjectMethod' -> '+: node.properties.0 -> ObjectMethod'`);
    t.end();
});

test('printer: remove-useless-success-from-type-checker: transform', (t) => {
    t.transform('remove-useless-success-from-type-checker');
    t.end();
});

test('printer: remove-useless-success-from-type-checker: no report: no-success', (t) => {
    t.noReport('no-success');
    t.end();
});

test('printer: remove-useless-success-from-type-checker: no report: no-previous', (t) => {
    t.noReport('no-previous');
    t.end();
});

test('printer: remove-useless-success-from-type-checker: no report: no-not', (t) => {
    t.noReport('no-not');
    t.end();
});

test('printer: remove-useless-success-from-type-checker: no report: not-string', (t) => {
    t.noReport('not-string');
    t.end();
});

test('printer: remove-useless-success-from-type-checker: no report: not-type-checker', (t) => {
    t.noReport('not-type-checker');
    t.end();
});
