import {createTest} from '@putout/test';
import * as splitDestructuring from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-destructuring', splitDestructuring],
    ],
});

test('plugin-destructuring: split-nested: report: destr', (t) => {
    t.report('destr', 'Avoid nested destructuring');
    t.end();
});

test('plugin-destructuring: split-nested: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});

test('plugin-destructuring: split-nested: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-destructuring: split-nested: transform: rename', (t) => {
    t.transform('rename');
    t.end();
});

test('plugin-destructuring: split-nested: transform: default', (t) => {
    t.transform('default');
    t.end();
});

test('plugin-destructuring: split-nested: transform: rename-assign', (t) => {
    t.transform('rename-assign');
    t.end();
});

test('plugin-destructuring: split-nested: no transform: couple', (t) => {
    t.noTransform('couple');
    t.end();
});

test('plugin-destructuring: split-nested: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('plugin-destructuring: split-nested: no transform: computed', (t) => {
    t.noTransform('computed');
    t.end();
});
