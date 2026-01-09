import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-module-to-namespace', plugin],
    ],
});

test('typescript: convert-module-to-namespace: report', (t) => {
    t.report('convert-module-to-namespace', `Use 'namespace' instead of 'module'`);
    t.end();
});

test('typescript: convert-module-to-namespace: transform', (t) => {
    t.transform('convert-module-to-namespace');
    t.end();
});
