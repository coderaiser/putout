'use strict';

const replaceWithMultiple = require('.');

const test = require('@putout/test')(__dirname, {
    'putout/replace-with-multiple': replaceWithMultiple,
});

test('plugin-putout: replace-with-multiple: report', (t) => {
    t.report('replace-with-multiple', `"operate.replaceWithMultiple" should be called instead of "path.replaceWithMultiple"`);
    t.end();
});

test('plugin-putout: replace-with-multiple: transform', (t) => {
    t.transform('replace-with-multiple');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: replaceWithMultiple: exists', (t) => {
    t.transform('replace-with-multiple-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: replaceWith: exists', (t) => {
    t.transform('replace-with-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: insertAfter: exists', (t) => {
    t.transform('insert-after-exists');
    t.end();
});
