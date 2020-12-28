'use strict';

const test = require('@putout/test')(__dirname, {
    madrun: require('..'),
});

test('plugin-madrun: transform', (t) => {
    t.transform('add-madrun-to-lint');
    t.end();
});

test('plugin-madrun: transform: no module.exports', (t) => {
    t.noTransform('no-module-exports');
    t.end();
});

test('plugin-madrun: no transform: module.exports not object', (t) => {
    t.noTransform('module-exports-not-object');
    t.end();
});
