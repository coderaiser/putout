'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['simplify-floor', plugin],
    ],
});

test('plugin-minify: simplify-floor: report', (t) => {
    t.report('simplify-floor', `Use '~~' instead of 'Math.floor()'`);
    t.end();
});

test('plugin-minify: simplify-floor: transform', (t) => {
    t.transform('simplify-floor');
    t.end();
});
