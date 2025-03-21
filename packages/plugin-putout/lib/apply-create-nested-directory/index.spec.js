import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-create-nested-directory', plugin],
    ],
});

test('putout: apply-create-nested-directory: report', (t) => {
    t.report('apply-create-nested-directory', `Use 'createNestedDirectory()' instead of 'createDirectory()'`);
    t.end();
});

test('putout: apply-create-nested-directory: transform', (t) => {
    t.transform('apply-create-nested-directory');
    t.end();
});

test('putout: apply-create-nested-directory: no report: not-string', (t) => {
    t.noReport('not-string');
    t.end();
});
