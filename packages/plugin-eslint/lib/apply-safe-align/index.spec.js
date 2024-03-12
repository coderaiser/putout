import {createTest} from '@putout/test';
import * as convertIdeToSafe from './index.js';

const test = createTest(import.meta.url, {
    'eslint/convert-safe-to-safe-align': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-safe-to-safe-align: report', (t) => {
    t.report('safe', 'Use "putout/safe+align" instead of "putout/safe"');
    t.end();
});

test('putout: plugin-eslint: convert-safe-to-safe-align: transform', (t) => {
    t.transform('safe');
    t.end();
});

test('putout: plugin-eslint: convert-safe-to-safe-align: no transform: no-extends', (t) => {
    t.noTransform('no-safe');
    t.end();
});
