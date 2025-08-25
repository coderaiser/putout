import {createTest} from '@putout/test';
import * as convertArgumentsToRest from '../lib/convert-arguments-to-rest.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-arguments-to-rest', convertArgumentsToRest],
    ],
});

test('plugin-convert-arguments-to-rest: report: arguments', (t) => {
    t.report('arguments', `Use 'rest parameters' instead of 'arguments'`);
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: arguments', (t) => {
    t.transform('arguments');
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: params', (t) => {
    t.transform('params');
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('plugin-convert-arguments-to-rest: no transform: strict', (t) => {
    t.noTransform('strict');
    t.end();
});
