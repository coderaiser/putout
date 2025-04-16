import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-namespace-import', plugin],
    ],
});

test('putout: plugin-esm: apply-namespace-import-to-file: apply-namespace-import: report', (t) => {
    t.reportWithOptions('apply-namespace-import', `'import a from "./a.js"' -> 'import * as a from "./a.js"'`, {
        name: 'a',
        source: './a.js',
    });
    t.end();
});

test('putout: plugin-esm: apply-namespace-import-to-file: apply-namespace-import: transform', (t) => {
    t.transformWithOptions('apply-namespace-import', {
        name: 'a',
        source: './a.js',
    });
    t.end();
});
