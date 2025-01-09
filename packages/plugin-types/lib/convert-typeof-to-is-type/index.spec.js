'use strict';

const {createTest} = require('@putout/test');
const convertTypeofToIsType = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-typeof-to-is-type', convertTypeofToIsType],
    ],
});

test('plugin-convert-typeof-to-is-type: report', (t) => {
    t.report('typeof', `Use function to check type instead of 'typeof' or 'instanceof'`);
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform', (t) => {
    t.transform('typeof');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-convert-typeof-to-is-type: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: global', (t) => {
    t.transform('global');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: bigint', (t) => {
    t.transform('bigint');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: is-error', (t) => {
    t.transform('is-error');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: instanceof', (t) => {
    t.transform('instanceof');
    t.end();
});

test('plugin-convert-typeof-to-is-type: no transform: bind', (t) => {
    t.noTransform('bind');
    t.end();
});

test('plugin-convert-typeof-to-is-type: no transform: not defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

test('plugin-convert-typeof-to-is-type: no transform: declared-not-var', (t) => {
    t.noTransform('declared-not-var');
    t.end();
});

test('plugin-convert-typeof-to-is-type: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('plugin-convert-typeof-to-is-type: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});
