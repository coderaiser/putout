'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
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

test('plugin-putout: create-test: no options: no transform', (t) => {
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
