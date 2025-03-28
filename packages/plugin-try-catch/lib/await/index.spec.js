import {createTest} from '@putout/test';
import * as tryCatch from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['await', tryCatch],
    ],
});

test('plugin-apply-await: await: report', (t) => {
    t.report('await', `Use await with 'tryToCatch'`);
    t.end();
});

test('plugin-apply-await: await: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-apply-await: await: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-apply-await: await: no transform: element', (t) => {
    t.noTransform('element');
    t.end();
});
