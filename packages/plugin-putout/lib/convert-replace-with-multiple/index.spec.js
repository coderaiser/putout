'use strict';

const {createTest} = require('@putout/test');
const replaceWithMultiple = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/replace-with-multiple', replaceWithMultiple],
    ],
});

test('plugin-putout: replace-with-multiple: report', (t) => {
    t.report('replace-with-multiple', `"operate.replaceWithMultiple" should be called instead of "path.replaceWithMultiple"`);
    t.end();
});

test('plugin-putout: replace-with-multiple: transform', (t) => {
    t.transform('replace-with-multiple');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: replaceWithMultiple: replace-with-multiple-exists', (t) => {
    t.transform('replace-with-multiple-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: replaceWith: replace-with-exists', (t) => {
    t.transform('replace-with-exists');
    t.end();
});

test('plugin-putout: replace-with-multiple: transform: insertAfter: insert-after-exists', (t) => {
    t.transform('insert-after-exists');
    t.end();
});
