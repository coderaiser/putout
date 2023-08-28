import {createTest} from '@putout/test';
import * as convertAnyToPrimitive from '../lib/convert-any-to-primitive.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-any-to-primitive', convertAnyToPrimitive],
    ],
});

test('plugin-convert-any-to-primitive: report', (t) => {
    t.report('any', 'Type "number" should be used instead of "any"');
    t.end();
});

test('plugin-convert-any-to-primitive: transform', (t) => {
    t.transform('any');
    t.end();
});
