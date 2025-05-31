import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-return', plugin],
    ],
});

test('packages: add-return: report', (t) => {
    t.report('add-return', `Add return statement`);
    t.end();
});

test('packages: add-return: transform', (t) => {
    t.transform('add-return');
    t.end();
});
