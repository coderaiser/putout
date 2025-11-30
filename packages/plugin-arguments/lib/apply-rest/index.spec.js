import {createTest} from '@putout/test';
import * as applyRest from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-rest', applyRest],
    ],
});

test('putout: plugin-arguments: apply-rest: report: arguments', (t) => {
    t.report('apply-rest', `Use 'rest parameters' instead of 'arguments'`);
    t.end();
});

test('putout: plugin-arguments: apply-rest: transform: arguments', (t) => {
    t.transform('apply-rest');
    t.end();
});

test('putout: plugin-arguments: apply-rest: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('putout: plugin-arguments: apply-rest: transform: params', (t) => {
    t.transform('params');
    t.end();
});

test('putout: plugin-arguments: apply-rest: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('putout: plugin-arguments: apply-rest: no transform: strict', (t) => {
    t.noTransform('strict');
    t.end();
});
