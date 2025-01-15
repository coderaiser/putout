'use strict';

const {createTest} = require('@putout/test');

const removeUselessVariables = require('@putout/plugin-remove-useless-variables');
const reuseDuplicateInit = require('..');

const declareStub = require('@putout/plugin-tape').rules.declare;

const test = createTest(__dirname, {
    plugins: [
        ['reuse-duplicate-init', reuseDuplicateInit],
    ],
});

test('plugin-reuse-duplicate-init: report', (t) => {
    t.report('init', 'Reuse duplicate init');
    t.end();
});

test('plugin-reuse-duplicate-init: transform', (t) => {
    t.transform('init');
    t.end();
});

test('plugin-reuse-duplicate-init: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: no-main', (t) => {
    t.noTransform('no-main');
    t.end();
});

test('plugin-reuse-duplicate-init: no report: rest', (t) => {
    t.noReport('rest');
    t.end();
});

test('plugin-reuse-duplicate-init: transform: no node', (t) => {
    t.transform('no-node', {
        'remove-useless-variables': removeUselessVariables,
    });
    t.end();
});

test('plugin-reuse-duplicate-init: transform: declare', (t) => {
    t.transform('declare-stub', {
        'tape/declare': declareStub,
    });
    t.end();
});
