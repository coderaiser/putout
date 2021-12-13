'use strict';

const {createTest} = require('@putout/test');
const reuseDuplicateInit = require('..');

const removeUselessVariables = require('@putout/plugin-remove-useless-variables');
const declareStub = require('@putout/plugin-tape').rules.declare;

const test = createTest(__dirname, {
    'reuse-duplicate-init': reuseDuplicateInit,
});

test('plugin-reuse-duplicate-init: report', (t) => {
    t.report('init', 'Duplicate init should be reused');
    t.end();
});

test('plugin-reuse-duplicate-init: transform', (t) => {
    t.transform('init');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: no main', (t) => {
    t.noTransform('no-main');
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

