import {createTest} from '@putout/test';
import * as nodejs from '@putout/plugin-nodejs';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-path-arg-to-fix', plugin],
    ],
});

test('putout: add-path-arg-to-fix: report: add-path-arg-to-fix', (t) => {
    t.report('add-path-arg-to-fix', `Add 'path' argument to 'fix'`);
    t.end();
});

test('putout: add-path-arg-to-fix: transform: add-path-arg-to-fix', (t) => {
    t.transform('add-path-arg-to-fix');
    t.end();
});

test('putout: add-path-arg-to-fix: no-report: empty-body', (t) => {
    t.noReport('empty-body');
    t.end();
});

test('putout: add-path-arg-to-fix: transform: convert-esm-to-commonjs', (t) => {
    t.transform('convert-esm-to-commonjs', {
        'convert-esm-to-commonjs': nodejs.rules['convert-esm-to-commonjs'],
    });
    t.end();
});

test('putout: add-path-arg-to-fix: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
