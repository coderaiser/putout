import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-args-from-called-with', plugin],
    ],
});

test('tape: extract-args-from-called-with: report', (t) => {
    t.report('extract-args-from-called-with', `Extract 'args' from 't.calledWith()'`);
    t.end();
});

test('tape: extract-args-from-called-with: transform', (t) => {
    t.transform('extract-args-from-called-with');
    t.end();
});
