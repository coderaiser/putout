import {createTest} from '@putout/test';
import * as convertThrow from '../lib/convert-throw.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-throw', convertThrow],
    ],
});

test('plugin-convert-throw: report: throw', (t) => {
    t.report('throw', '"throw" should be used without body');
    t.end();
});

test('plugin-convert-throw: transform: throw', (t) => {
    t.transform('throw');
    t.end();
});
