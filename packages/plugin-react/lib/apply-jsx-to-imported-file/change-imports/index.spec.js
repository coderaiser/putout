import {createTest} from '@putout/test';
import * as plugin from '#change-imports';

const test = createTest(import.meta.url, {
    plugins: [
        ['change-imports', plugin],
    ],
});

test('putout: react: apply-jsx-to-imported-file: no report: change-imports-without-options', (t) => {
    t.noReport('change-imports-without-options');
    t.end();
});

test('putout: react: apply-jsx-to-imported-file: report: change-imports', (t) => {
    t.reportWithOptions('change-imports', ``, {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: react: apply-jsx-to-imported-file: transform with options: change-imports', (t) => {
    t.transformWithOptions('change-imports', {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: react: apply-jsx-to-imported-file: transform with options: dynamic', (t) => {
    t.transformWithOptions('dynamic', {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: react: apply-jsx-to-imported-file: transform with options: json', (t) => {
    t.transformWithOptions('json', {
        from: './a',
        to: './a.json',
    });
    t.end();
});

test('putout: react: apply-jsx-to-imported-file: transform with options: export', (t) => {
    t.transformWithOptions('export', {
        from: './a',
        to: './a.js',
    });
    t.end();
});
