import {createTest} from '@putout/test';
import * as applyStub from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-stub', applyStub],
    ],
});

test('plugin-tape: apply-stub: report: fn', (t) => {
    const result = 'fn';
    const expected = `Use 'stub()' instead of creating a function`;
    
    t.report(result, expected);
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
