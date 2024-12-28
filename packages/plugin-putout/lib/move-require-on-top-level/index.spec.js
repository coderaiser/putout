'use strict';

const {createTest} = require('@putout/test');
const moveRequireOnTopLevel = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/move-require-on-top-level', moveRequireOnTopLevel],
    ],
});

test('plugin-putout: move-require-on-top-level: report', (t) => {
    t.report('require', 'Move require on top level');
    t.end();
});

test('plugin-putout: move-require-on-top-level: transform', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-putout: move-require-on-top-level: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-putout: move-require-on-top-level: no transform: top-level', (t) => {
    t.noTransform('top-level');
    t.end();
});

test('plugin-putout: move-require-on-top-level: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

test('plugin-putout: move-require-on-top-level: no transform: not-require', (t) => {
    t.noTransform('not-require');
    t.end();
});
