import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-tuples-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-tuples-from-type-checker: report', (t) => {
    t.report('remove-useless-tuples-from-type-checker', `Remove useless tuple from: ['- : -> BlockStatement']`);
    t.end();
});

test('printer: remove-useless-tuples-from-type-checker: transform', (t) => {
    t.transform('remove-useless-tuples-from-type-checker');
    t.end();
});

test('printer: remove-useless-tuples-from-type-checker: transform: one-element-tuple', (t) => {
    t.transform('one-element-tuple');
    t.end();
});
