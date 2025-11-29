import {createTest} from '@putout/test';
import * as applyObject from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['destructuring/apply-object', applyObject],
    ],
});

test('plugin-destructuring: apply-object: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('plugin-destructuring: apply-object: no transform: while', (t) => {
    t.noTransform('while');
    t.end();
});

test('plugin-destructuring: apply-object: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

test('plugin-destructuring: apply-object: no transform: object-expression', (t) => {
    t.noTransform('object-expression');
    t.end();
});
