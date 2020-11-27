'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-replace-with': require('.'),
});

test('plugin-putout: report', (t) => {
    t.report('replace-with', `"operator.replaceWith" should be called instead of "path.replaceWith"`);
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('replace-with');
    t.end();
});

test('plugin-putout: transform: replaceWith exists', (t) => {
    t.transform('replace-with-exists');
    t.end();
});

test('plugin-putout: transform: replaceWith multiple exists', (t) => {
    t.transform('replace-with-multiple-exists');
    t.end();
});

test('plugin-putout: transform: insertAfter exists', (t) => {
    t.transform('insert-after-exists');
    t.end();
});

test('plugin-putout: transform: putout declared', (t) => {
    t.transform('putout-declared');
    t.end();
});
