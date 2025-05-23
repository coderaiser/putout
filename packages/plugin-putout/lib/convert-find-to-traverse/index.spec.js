import {createTest} from '@putout/test';
import * as convertFindToTraverse from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-find-to-traverse', convertFindToTraverse],
    ],
});

test('plugin-putout: convert find to traverse: report: find', (t) => {
    t.report('find', `"traverse" should be used instead of "find"`);
    t.end();
});

test('plugin-putout: convert find to traverse: transform: find', (t) => {
    t.transform('find');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: for-of', (t) => {
    t.noTransform('for-of');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: find: find-one-arg', (t) => {
    t.noTransform('find-one-arg');
    t.end();
});
