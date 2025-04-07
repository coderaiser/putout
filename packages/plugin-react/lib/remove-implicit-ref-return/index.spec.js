import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-implicit-ref-return', plugin],
    ],
});

test('react: remove-implicit-ref-return: report', (t) => {
    t.report('remove-implicit-ref-return', `Remove implicit 'ref' return`);
    t.end();
});

test('react: remove-implicit-ref-return: transform', (t) => {
    t.transform('remove-implicit-ref-return');
    t.end();
});
