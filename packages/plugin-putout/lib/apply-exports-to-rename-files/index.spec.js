import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-exports-to-rename-files', plugin],
    ],
});

test('putout: apply-exports-to-rename-files: report', (t) => {
    t.report('apply-exports-to-rename-files', `Apply 'exports' to 'renameFiles()`);
    t.end();
});

test('putout: apply-exports-to-rename-files: transform', (t) => {
    t.transform('apply-exports-to-rename-files');
    t.end();
});
