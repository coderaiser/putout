import {createTest} from '@putout/test';
import * as convertAnyToPrimitive from '../lib/convert-any-to-primitive.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-any-to-primitive', convertAnyToPrimitive],
    ],
});

test('plugin-convert-any-to-primitive: report: any', (t) => {
    t.report('any', 'Type "number" should be used instead of "any"');
    t.end();
});

test('plugin-convert-any-to-primitive: transform: any', (t) => {
    t.transform('any');
    t.end();
});
