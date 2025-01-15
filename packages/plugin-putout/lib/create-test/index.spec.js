'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/create-test', plugin],
    ],
});

test('plugin-putout: create-test: report', (t) => {
    t.reportWithOptions('create-test', `Apply modifications to 'createTest()' options`, {
        add: [
            ['printer', 'putout'],
        ],
    });
    t.end();
});

test('plugin-putout: create-test: no options: no transform: create-test-no-options', (t) => {
    t.noTransform('create-test-no-options');
    t.end();
});

test('plugin-putout: create-test: transform', (t) => {
    t.transformWithOptions('create-test', {
        add: [
            ['printer', 'putout'],
            ['plugins', []],
        ],
    });
    t.end();
});

test('plugin-putout: create-test: transform: id-id', (t) => {
    t.transformWithOptions('id-id', {
        add: [
            ['printer', 'putout'],
            ['plugins', []],
        ],
    });
    t.end();
});

test('plugin-putout: create-test: transform: esm', (t) => {
    t.transformWithOptions('esm', {
        add: [
            ['printer', 'putout'],
        ],
    });
    t.end();
});
