import {createTest} from '@putout/test';
import * as convertNodeToResolveFallback from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['webpack/convert-node-to-resolve-fallback', convertNodeToResolveFallback],
    ],
});

test('plugin-webpack: convert-node-to-resolve-fallback: report: node', (t) => {
    t.report('node', `"resolve.fallback" should be used instead of "node"`);
    t.end();
});

test('plugin-webpack: convert-node-to-resolve-fallback: transform: node', (t) => {
    t.transform('node');
    t.end();
});

test('plugin-webpack: convert-node-to-resolve-fallback: no transform: no-node', (t) => {
    t.noTransform('no-node');
    t.end();
});
