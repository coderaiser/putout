import {createTest} from '@putout/test';
import * as applyClearErrors from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-clear-errors', applyClearErrors],
    ],
});

test('plugin-nextjs: apply-clear-errors: report', (t) => {
    t.report('apply-clear-errors', `Use 'clearErrors' instead of 'clearError'`);
    t.end();
});

test('plugin-nextjs: apply-clear-errors: transform', (t) => {
    t.transform('apply-clear-errors');
    t.end();
});
