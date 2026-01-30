import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-named-import', plugin],
    ],
});

test('putout: plugin-esm: apply-named-import-to-file: apply-named-import: report', (t) => {
    t.reportWithOptions('apply-named-import', `'import a from "./a.js"' -> 'import {a} from "./a.js"'`, {
        name: 'a',
        source: './a.js',
    });
    t.end();
});

test('putout: plugin-esm: apply-named-import-to-file: apply-named-import: transform with options', (t) => {
    t.transformWithOptions('apply-named-import', {
        name: 'a',
        source: './a.js',
    });
    t.end();
});
