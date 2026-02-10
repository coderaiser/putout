import {createTest} from '@putout/test';
import * as plugin from '#change-imports';

const test = createTest(import.meta.url, {
    plugins: [
        ['change-imports', plugin],
    ],
});

test('putout: esm: resolve-imported-file: no report: change-imports', (t) => {
    t.noReport('change-imports');
    t.end();
});

test('putout: esm: resolve-imported-file: report: change-imports', (t) => {
    t.reportWithOptions('change-imports', ``, {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: esm: resolve-imported-file: transform with options: change-imports', (t) => {
    t.transformWithOptions('change-imports', {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: esm: resolve-imported-file: transform with options: dynamic', (t) => {
    t.transformWithOptions('dynamic', {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: esm: resolve-imported-file: transform with options: json', (t) => {
    t.transformWithOptions('json', {
        from: './a',
        to: './a.json',
    });
    t.end();
});
