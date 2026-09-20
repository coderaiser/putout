import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-shorthand', plugin],
    ],
});

test('css: apply-shorthand: report', (t) => {
    t.report('apply-shorthand', `Apply shorthand`);
    t.end();
});

test('css: apply-shorthand: transform', (t) => {
    t.transform('apply-shorthand');
    t.end();
});
