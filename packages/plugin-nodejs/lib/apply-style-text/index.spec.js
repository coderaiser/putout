import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-style-text', plugin],
    ],
});

test('nodejs: apply-style-text: report', (t) => {
    t.report('apply-style-text', `Use 'gray' instead of 'grey' in 'styleText()'`);
    t.end();
});

test('nodejs: apply-style-text: transform', (t) => {
    t.transform('apply-style-text');
    t.end();
});
