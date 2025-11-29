import {createTest} from '@putout/test';
import * as applyDestructuring from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['destructuring', applyDestructuring],
    ],
});

test('plugin-destructuring: report: apply-object', (t) => {
    t.report('apply-object', 'Use object destructuring');
    t.end();
});

test('plugin-destructuring: transform: apply-object', (t) => {
    t.transform('apply-object');
    t.end();
});

test('plugin-destructuring: transform: apply-array', (t) => {
    const code = 'const name = array[0];';
    const fix = 'const [name] = array;\n';
    
    t.transformCode(code, fix);
    t.end();
});

test('plugin-destructuring: transform: apply-array: destructuring', (t) => {
    const code = 'const {name} = array[0];\n';
    
    t.noTransformCode(code);
    t.end();
});

test('plugin-destructuring: transform: vars', (t) => {
    t.transform('vars');
    t.end();
});

test('plugin-destructuring: no transform: logical: logical-and', (t) => {
    t.noTransform('logical-and');
    t.end();
});

test('plugin-destructuring: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

test('plugin-destructuring: transform: remove-useless-object', (t) => {
    t.transform('remove-useless-object');
    t.end();
});

test('plugin-destructuring: transform: convert-object-to-array', (t) => {
    t.transform('convert-object-to-array');
    t.end();
});

test('plugin-destructuring: transform: split-nested', (t) => {
    t.transform('split-nested');
    t.end();
});

test('plugin-destructuring: transform: split-call', (t) => {
    t.transform('split-call');
    t.end();
});

test('plugin-destructuring: transform: merge-properties', (t) => {
    t.transform('merge-properties');
    t.end();
});
