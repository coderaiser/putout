import {createTest} from '@putout/test';
import * as convertRequireToImport from './index.js';

const test = createTest(import.meta.url, {
    'eslint/convert-require-to-import': convertRequireToImport,
});

test('putout: plugin-eslint: convert-require-to-import-in-extends: report: convert-require-to-import', (t) => {
    t.report('convert-require-to-import', `Use 'import' in ESM`);
    t.end();
});

test('putout: plugin-eslint: convert-require-to-import-in-extends: no transform: convert-require-to-import', (t) => {
    t.noTransform('convert-require-to-import');
    t.end();
});
