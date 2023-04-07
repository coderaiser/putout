'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/convert-dirname-to-url', plugin],
    ],
});

test('plugin-putout: convert-dirname-to-url: report', (t) => {
    t.report('dirname', `Use 'createTest(import.meta.url)' instead of 'createTest(__dirname)'`);
    t.end();
});

test('plugin-putout: convert-dirname-to-url: transform', (t) => {
    t.transform('dirname');
    t.end();
});

test('plugin-putout: convert-dirname-to-url: no transform: commonjs', (t) => {
    t.noTransform('commonjs');
    t.end();
});
