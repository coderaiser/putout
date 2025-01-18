'use strict';

const {createTest} = require('@putout/test');
const convertIdeToSafe = require('./index.js');

const test = createTest(__dirname, {
    'eslint/convert-ide-to-safe': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-ide-to-safe: report: ide', (t) => {
    t.report('ide', 'Use "putout/safe" instead of "putout/ide"');
    t.end();
});

test('putout: plugin-eslint: convert-ide-to-safe: transform: ide', (t) => {
    t.transform('ide');
    t.end();
});

test('putout: plugin-eslint: convert-ide-to-safe: no transform: no-extends', (t) => {
    t.noTransform('no-extends');
    t.end();
});
