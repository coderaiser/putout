import {createTest} from '@putout/test';
import * as applyEarlyReturn from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-early-return', applyEarlyReturn],
    ],
});

test('plugin-apply-early-return: report: else', (t) => {
    t.report('else', 'Apply early return');
    t.end();
});

test('plugin-apply-early-return: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-apply-early-return: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});
