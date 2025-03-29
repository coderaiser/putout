import {createTest} from '@putout/test';
import * as applyStub from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-stub', applyStub],
    ],
});

test('plugin-tape: apply-stub: report: fn', (t) => {
    t.report('fn', `Use 'stub()' instead of creating a function`);
    t.end();
});

test('plugin-tape: apply-stub: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-tape: apply-stub: no transform: no-var', (t) => {
    t.noTransform('no-var');
    t.end();
});
