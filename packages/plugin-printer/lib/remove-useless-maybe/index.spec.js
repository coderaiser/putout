import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-maybe', plugin],
    ],
});

test('printer: remove-useless-maybe: report', (t) => {
    t.report('remove-useless-maybe', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('printer: remove-useless-maybe: transform', (t) => {
    t.transform('remove-useless-maybe');
    t.end();
});
