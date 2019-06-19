'use strict';

const test = require('@putout/test')(__dirname, {
    'test': require('.'),
});

test('plugin-putout: convert find to traverse: report', (t) => {
    t.report('find', `"traverse" should be used instead of "find"`);
    t.end();
});

test('plugin-putout: convert find to traverse: transform', (t) => {
    t.transform('find');
    t.end();
});

test('plugin-putout: convert find to traverse: transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-putout: convert find to traverse: transform: return', (t) => {
    t.noTransform('return');
    t.end();
});
