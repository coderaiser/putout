import {createTest} from '@putout/test';
import * as tryCatch from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['try-catch', tryCatch],
    ],
});

test('plugin-try-catch: report: try-catch', (t) => {
    t.report('try-catch', `Use 'tryCatch()' instead of 'try..catch' block`);
    t.end();
});

test('plugin-try-catch: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-try-catch: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-try-catch: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-try-catch: transform: expand-arguments', (t) => {
    t.transform('expand-arguments');
    t.end();
});

test('plugin-try-catch: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});
