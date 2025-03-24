import {createTest} from '@putout/test';
import * as simplify from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['assignment/simplify', simplify],
    ],
});

test('plugin-assignment: simplify: report: assignment', (t) => {
    t.report('assignment', 'Simplify assignment');
    t.end();
});

test('plugin-assignment: simplify: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-assignment: simplify: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});

test('plugin-assignment: simplify: no transform: iife', (t) => {
    t.noTransform('iife');
    t.end();
});
