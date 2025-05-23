import {createTest} from '@putout/test';
import * as convertBooleanToString from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout-config/convert-boolean-to-string', convertBooleanToString],
    ],
});

test('plugin-putout-config: convert-boolean-to-string: report: bool', (t) => {
    t.report('bool', `Use 'String (on/off)' instead of 'Boolean (true/false)'`);
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: bool: bool-first', (t) => {
    t.transform('bool-first');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: match', (t) => {
    t.transform('match');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: no transform: tuple', (t) => {
    t.noTransform('tuple');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: no transform: options', (t) => {
    t.noTransform('options');
    t.end();
});
