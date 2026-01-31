import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-named-import', plugin],
    ],
});

test('putout: plugin-esm: apply-name-to-imported-file: apply-named-import: report', (t) => {
    t.reportWithOptions('apply-named-import', `'import a from "./a.js"' -> 'import {a} from "./a.js"'`, {
        name: 'a',
        source: './a.js',
    });
    t.end();
});

test('putout: plugin-esm: apply-name-to-imported-file: apply-named-import: transform with options', (t) => {
    t.transformWithOptions('apply-named-import', {
        name: 'a',
        source: './a.js',
    });
    t.end();
});

test('putout: plugin-esm: apply-name-to-imported-file: apply-named-import: transform with options: export', (t) => {
    t.transformWithOptions('export', {
        name: 'a',
        source: './a.js',
    });
    t.end();
});

test('putout: plugin-esm: apply-name-to-imported-file: apply-named-import: report with options: export', (t) => {
    t.reportWithOptions('export', `'export * as a from "./a.js"' -> 'export {a} from "./a.js"'`, {
        name: 'a',
        source: './a.js',
    });
    t.end();
});
