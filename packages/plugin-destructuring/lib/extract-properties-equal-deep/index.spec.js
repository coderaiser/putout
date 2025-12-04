import {createTest} from '@putout/test';
import * as equalDeep from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-object-properties/equal-deep', equalDeep],
    ],
});

test('putout: plugin-destructuring: extract-properties-report: fn', (t) => {
    t.report('fn', 'Extract object properties into variables');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: fn-args', (t) => {
    t.noTransform('fn-args');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: not-var', (t) => {
    t.noTransform('not-var');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: one-prop', (t) => {
    t.noTransform('one-prop');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: var-exist', (t) => {
    t.noTransform('var-exist');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: default', (t) => {
    t.noTransform('default');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: no-destr', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('putout: plugin-destructuring: extract-properties-no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});
