import {createTest} from '@putout/test';
import * as applyStub from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-destructuring', applyStub],
    ],
});

test('plugin-tape: apply-destructuring: report', (t) => {
    t.report('apply-destructuring', `Use destructuring when require 'test' -> '{test}'`);
    t.end();
});

test('plugin-tape: apply-destructuring: transform', (t) => {
    t.transform('apply-destructuring');
    t.end();
});

test('plugin-tape: apply-destructuring: transform: no-stub', (t) => {
    t.transform('no-stub');
    t.end();
});

test('plugin-tape: apply-destructuring: transform: other-name', (t) => {
    t.transform('other-name');
    t.end();
});
