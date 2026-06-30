import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-undefined', plugin],
    ],
});

test('tape: remove-useless-undefined: report', (t) => {
    t.report('remove-useless-undefined', `Avoid useless 'returns/resolves(undefined)'`);
    t.end();
});

test('tape: remove-useless-undefined: transform', (t) => {
    t.transform('remove-useless-undefined');
    t.end();
});
