import {createTest} from '@putout/test';
import * as applyStub from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-destructuring', applyStub],
    ],
});

test('plugin-tape: apply-destructuring: report', (t) => {
    t.report('apply-destructuring', `Use destructuring when using 'stub()' in 'test()'`);
    t.end();
});

test('plugin-tape: apply-destructuring: transform', (t) => {
    t.transform('apply-destructuring');
    t.end();
});

test('plugin-tape: apply-destructuring: no transform: no-stub', (t) => {
    t.noTransform('no-stub');
    t.end();
});
