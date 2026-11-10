import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-boolean-operator-to-type-checker', plugin],
    ],
});

test('printer: apply-boolean-operator-to-type-checker: report', (t) => {
    t.report('apply-boolean-operator-to-type-checker', `Apply boolean operator: '-'`);
    t.end();
});

test('printer: apply-boolean-operator-to-type-checker: transform', (t) => {
    t.transform('apply-boolean-operator-to-type-checker');
    t.end();
});
