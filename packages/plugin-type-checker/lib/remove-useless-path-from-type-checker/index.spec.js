import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-path-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-path-from-type-checker: report', (t) => {
    t.report('remove-useless-path-from-type-checker', `Avoid useless 'path': '-: path.parentPath' -> '-: parentPath'`);
    t.end();
});

test('printer: remove-useless-path-from-type-checker: transform', (t) => {
    t.transform('remove-useless-path-from-type-checker');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-binding', (t) => {
    t.noTransform('remove-useless-path-binding');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-mixed-calls', (t) => {
    t.noTransform('remove-useless-path-mixed-calls');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-exported', (t) => {
    t.noTransform('remove-useless-path-exported');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-export-specifier', (t) => {
    t.noTransform('remove-useless-path-export-specifier');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-no-call', (t) => {
    t.noTransform('remove-useless-path-no-call');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-inline', (t) => {
    t.noTransform('remove-useless-path-inline');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-not-declared', (t) => {
    t.noTransform('remove-useless-path-not-declared');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-passed', (t) => {
    t.noTransform('remove-useless-path-passed');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-no-args', (t) => {
    t.noTransform('remove-useless-path-no-args');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: remove-useless-path-computed', (t) => {
    t.noTransform('remove-useless-path-computed');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: transform: remove-useless-path-member', (t) => {
    t.transform('remove-useless-path-member');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: transform: remove-useless-path-many-calls', (t) => {
    t.transform('remove-useless-path-many-calls');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: transform: remove-useless-path-inline-path', (t) => {
    t.transform('remove-useless-path-inline-path');
    t.end();
});

test('printer: remove-useless-path-from-type-checker: no transform: not-type-checker', (t) => {
    t.noTransform('not-type-checker');
    t.end();
});
