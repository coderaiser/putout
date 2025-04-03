import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-for-await', plugin],
    ],
});

test('parens: parens: add-missing-for-await: report', (t) => {
    t.report('add-missing-for-await', `TypeError: 'asyncFn()?.filter' is not a function`);
    t.end();
});

test('parens: parens: add-missing-for-await: transform', (t) => {
    t.transform('add-missing-for-await');
    t.end();
});
