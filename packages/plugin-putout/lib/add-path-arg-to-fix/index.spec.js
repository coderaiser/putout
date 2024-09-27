'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('@putout/plugin-nodejs');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-path-arg-to-fix', plugin],
    ],
});

test('putout: add-path-arg-to-fix: report', (t) => {
    t.report('add-path-arg-to-fix', `Add 'path' argument to 'fix'`);
    t.end();
});

test('putout: add-path-arg-to-fix: transform', (t) => {
    t.transform('add-path-arg-to-fix');
    t.end();
});

test('putout: add-path-arg-to-fix: transform: convert-esm-to-commonjs', (t) => {
    t.transform('convert-esm-to-commonjs', {
        'convert-esm-to-commonjs': nodejs.rules['convert-esm-to-commonjs'],
    });
    t.end();
});
