import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-stringify', plugin],
    ],
});

test('tape: apply-stringify: report', (t) => {
    t.report('apply-stringify', `Use 'stringify' instead of passing JSON string`);
    t.end();
});

test('tape: apply-stringify: transform', (t) => {
    t.transform('apply-stringify');
    t.end();
});
