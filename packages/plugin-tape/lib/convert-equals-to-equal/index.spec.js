import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-equals-to-equal', plugin],
    ],
});

test('tape: convert-equals-to-equal: report', (t) => {
    t.report('convert-equals-to-equal', `Use 't.equal()' instead of 't.equals()''`);
    t.end();
});

test('tape: convert-equals-to-equal: transform', (t) => {
    t.transform('convert-equals-to-equal');
    t.end();
});
