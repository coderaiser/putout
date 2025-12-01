import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-spread', plugin],
    ],
});

test('putout-config: apply-spread: report', (t) => {
    t.report('apply-spread', `Rename property: 'remove-useless-spread' -> 'spread'`);
    t.end();
});

test('putout-config: apply-spread: transform', (t) => {
    t.transform('apply-spread');
    t.end();
});
