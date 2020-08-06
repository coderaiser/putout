'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-path-remove': require('.'),
});

test('plugin-putout: path-remove: report', (t) => {
    t.report('path-remove', `"operator.remove" should be called instead of "path.remove"`);
    t.end();
});

test('plugin-putout: path-remove: transform', (t) => {
    t.transform('path-remove');
    t.end();
});

test('plugin-putout: transform: replaceWith exists', (t) => {
    t.transform('remove-exists');
    t.end();
});

test('plugin-putout: transform: replaceWithMmultiple exists', (t) => {
    t.transform('replace-with-multiple-exists');
    t.end();
});

test('plugin-putout: transform: insertAfter exists', (t) => {
    t.transform('insert-after-exists');
    t.end();
});

