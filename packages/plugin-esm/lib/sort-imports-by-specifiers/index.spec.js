import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-imports-by-specifiers', plugin],
    ],
});

test('putout: sort-imports-by-specifiers: report', (t) => {
    t.report('sort-imports-by-specifiers', `Sort imports by specifiers count`);
    t.end();
});

test('putout: sort-imports-by-specifiers: no report: one-import', (t) => {
    t.noReport('one-import');
    t.end();
});

test('putout: sort-imports-by-specifiers: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('putout: sort-imports-by-specifiers: transform', (t) => {
    t.transform('sort-imports-by-specifiers');
    t.end();
});

test('putout: sort-imports-by-specifiers: no transform: hash', (t) => {
    t.noTransform('hash');
    t.end();
});

test('putout: sort-imports-by-specifiers: three', (t) => {
    t.noTransform('three');
    t.end();
});

test('putout: sort-imports-by-specifiers: external-internal', (t) => {
    t.noTransform('external-internal');
    t.end();
});

test('putout: sort-imports-by-specifiers: external-hashed', (t) => {
    t.noReport('external-hashed');
    t.end();
});

test('putout: sort-imports-by-specifiers: lots', (t) => {
    t.transform('lots');
    t.end();
});
