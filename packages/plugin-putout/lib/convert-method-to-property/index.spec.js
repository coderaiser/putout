import {createTest} from '@putout/test';
import * as convertMethodToProperty from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-method-to-property', convertMethodToProperty],
    ],
});

test('plugin-putout: convert-method-to-property: report: match', (t) => {
    t.report('match', 'Object Property should be used instead of Method');
    t.end();
});

test('plugin-putout: convert-method-to-property: transform: match', (t) => {
    t.transform('match');
    t.end();
});

test('plugin-putout: convert-method-to-property: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-putout: convert-method-to-property: no transform: no-args', (t) => {
    t.noTransform('no-args');
    t.end();
});
