import {createTest} from '@putout/test';
import * as convertCalledWithArguments from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-called-with-arguments', convertCalledWithArguments],
    ],
});

test('plugin-tape: convert-called-with-arguments: report: args', (t) => {
    t.report('args', `Use an array as args to 'calledWith()'`);
    t.end();
});

test('plugin-tape: convert-called-with-arguments: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});
