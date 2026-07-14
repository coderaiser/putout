import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-out-result-from-assertion', plugin],
    ],
});

test('tape: move-out-result-from-assertion: report', (t) => {
    t.report('move-out-result-from-assertion', `Move out result from asssertion`);
    t.end();
});

test('tape: move-out-result-from-assertion: transform', (t) => {
    t.transform('move-out-result-from-assertion');
    t.end();
});
