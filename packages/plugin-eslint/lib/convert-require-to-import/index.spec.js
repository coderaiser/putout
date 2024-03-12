import {createTest} from '@putout/test';
import * as convertRequireToImport from './index.js';

const test = createTest(import.meta.url, {
    'eslint/convert-require-to-import': convertRequireToImport,
});

test('putout: plugin-eslint: convert-require-to-import-in-extends: report', (t) => {
    t.report('convert-require-to-import', `Use 'import' in ESM`);
    t.end();
});

test('putout: plugin-eslint: convert-require-to-import-in-extends: transform', (t) => {
    t.transform('convert-require-to-import');
    t.end();
});
