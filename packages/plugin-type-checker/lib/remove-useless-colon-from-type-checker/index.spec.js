import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-colon-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-colon-from-type-checker: report', (t) => {
    t.report('remove-useless-colon-from-type-checker', `Remove useless colon: '+:' -> '+'`);
    t.end();
});

test('printer: remove-useless-colon-from-type-checker: transform', (t) => {
    t.transform('remove-useless-colon-from-type-checker');
    t.end();
});
