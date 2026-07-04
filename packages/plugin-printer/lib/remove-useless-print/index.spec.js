import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-print', plugin],
    ],
});

test('printer: remove-useless-print: report', (t) => {
    t.report('remove-useless-print', `Avoid 'print' when it is the only method`);
    t.end();
});

test('printer: remove-useless-print: transform', (t) => {
    t.transform('remove-useless-print');
    t.end();
});
