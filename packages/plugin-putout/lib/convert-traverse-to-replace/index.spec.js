import {createTest} from '@putout/test';
import * as convertTraverseToReplace from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-traverse-to-replace', convertTraverseToReplace],
    ],
});

test('plugin-putout: convert-traverse-to-replace: report: traverse', (t) => {
    t.report('traverse', 'Replacer should be used instead of Traverser (https://git.io/JqcMn)');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: with-fix', (t) => {
    t.noTransform('with-fix');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: with-push', (t) => {
    t.noTransform('with-push');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: transform: with-options', (t) => {
    t.transform('with-options');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: push', (t) => {
    t.noTransform('push');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: property', (t) => {
    t.noTransform('property');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: transform: string', (t) => {
    t.transform('string');
    t.end();
});
