import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-context-to-source', plugin],
    ],
});

test('packages: convert-context-to-source: report', (t) => {
    t.report('convert-context-to-source', `Use 'source' instead of 'context'`);
    t.end();
});

test('packages: convert-context-to-source: transform', (t) => {
    t.transform('convert-context-to-source');
    t.end();
});
