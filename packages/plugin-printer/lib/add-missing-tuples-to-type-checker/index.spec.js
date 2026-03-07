import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-tuples-to-type-checker', plugin],
    ],
});

test('printer: add-missing-tuples-to-type-checker: report', (t) => {
    t.report('add-missing-tuples-to-type-checker', `Add missing tuple around: '- : -> !StringLiteral'`);
    t.end();
});

test('printer: add-missing-tuples-to-type-checker: transform', (t) => {
    t.transform('add-missing-tuples-to-type-checker');
    t.end();
});
