import {createTest} from '@putout/test';
import * as convertTraverseToInclude from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-traverse-to-include', convertTraverseToInclude],
    ],
});

test('plugin-putout: convert-traverse-to-include: report: traverse', (t) => {
    t.report('traverse', 'Includer should be used instead of Traverser');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: no-method', (t) => {
    t.noTransform('no-method');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: no-properties', (t) => {
    t.noTransform('no-properties');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: couple', (t) => {
    t.noTransform('couple');
    t.end();
});
