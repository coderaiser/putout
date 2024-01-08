import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['merge-loops', plugin],
    ],
});

test('packages: merge-loops: report', (t) => {
    t.report('merge-loops', `Merge loops`);
    t.end();
});

test('packages: merge-loops: transform', (t) => {
    t.transform('merge-loops');
    t.end();
});
