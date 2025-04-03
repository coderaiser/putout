import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-for-params', plugin],
    ],
});

test('parens: remove-useless-for-params: report', (t) => {
    t.report('remove-useless-for-params', `Avoid useless parens: '(b)' -> 'b'`);
    t.end();
});

test('parens: remove-useless-for-params: transform', (t) => {
    t.transform('remove-useless-for-params');
    t.end();
});
