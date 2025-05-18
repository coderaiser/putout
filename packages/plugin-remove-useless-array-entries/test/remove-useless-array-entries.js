import {createTest} from '@putout/test';
import * as removeUselessSpread from '../lib/remove-useless-array-entries.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-array-entries', removeUselessSpread],
    ],
});

test('plugin-remove-useless-array-entries: report: for-of', (t) => {
    t.report('for-of', `Remove useless '.entries()'`);
    t.end();
});

test('plugin-remove-useless-array-entries: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});
