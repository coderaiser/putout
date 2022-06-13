'use strict';

const {operator} = require('putout');
const {createTest} = require('@putout/test');

const declare = require('../declare/index.js');
const convertEsmToCommonjs = require('@putout/plugin-convert-esm-to-commonjs');
const putout = require('@putout/plugin-putout');
const plugin = require('.');

const {remove} = operator;

const test = createTest(__dirname, {
    'declare-after-require': plugin,
});

test('plugin-declare-after-require: report', (t) => {
    t.report('require', `Declare 'isObject' after last 'require()'`);
    t.end();
});

test('plugin-declare-after-require: report: destructuring', (t) => {
    t.report('destructuring', `Declare '{compare}' after last 'require()'`);
    t.end();
});

test('plugin-declare-after-require: transform', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-declare-after-require: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-declare-after-require: no report: no-require', (t) => {
    t.noReport('no-require');
    t.end();
});

test('plugin-declare-after-require: no report: create-require', (t) => {
    t.noReport('create-require');
    t.end();
});

test('plugin-declare-after-require: no report after transform', (t) => {
    t.noReportAfterTransform('require');
    t.end();
});

test('plugin-declare-after-require: transform: no-loc', (t) => {
    t.transform('no-loc', {
        declare,
        convertEsmToCommonjs,
    });
    t.end();
});

test('plugin-declare-after-require: transform: putout', (t) => {
    t.transform('putout', {
        putout,
        convertEsmToCommonjs,
    });
    t.end();
});

test('plugin-declare-after-require: transform: reference', (t) => {
    t.transform('reference');
    t.end();
});

test('plugin-declare-after-require: transform: removed', (t) => {
    t.transform('removed', {
        remove: {
            report: () => {},
            include: () => ['const a = 5'],
            fix: (path) => {
                remove(path);
            },
        },
    });
    t.end();
});
