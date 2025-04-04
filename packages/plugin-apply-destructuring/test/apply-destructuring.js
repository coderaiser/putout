import {createTest} from '@putout/test';
import * as applyDestructuring from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-destructuring', applyDestructuring],
    ],
});

test('plugin-apply-destructuring: report: object', (t) => {
    t.report('object', 'Use object destructuring');
    t.end();
});

test('plugin-apply-destructuring: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-apply-destructuring: transform: array', (t) => {
    const code = 'const name = array[0];';
    const fix = 'const [name] = array;\n';
    
    t.transformCode(code, fix);
    t.end();
});

test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0];\n';
    
    t.noTransformCode(code);
    t.end();
});

test('plugin-apply-destructuring: transform: vars', (t) => {
    t.transform('vars');
    t.end();
});

test('plugin-apply-destructuring: no transform: logical: logical-and', (t) => {
    t.noTransform('logical-and');
    t.end();
});

test('plugin-apply-destructuring: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

test('plugin-apply-destructuring: transform: falsy', (t) => {
    t.transform('falsy');
    t.end();
});
