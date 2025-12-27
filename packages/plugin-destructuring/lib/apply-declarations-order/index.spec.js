import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-declarations-order', plugin],
    ],
});

test('destructuring: apply-declarations-order: report', (t) => {
    t.report('apply-declarations-order', `Apply declarations order`);
    t.end();
});

test('destructuring: apply-declarations-order: transform', (t) => {
    t.transform('apply-declarations-order');
    t.end();
});
