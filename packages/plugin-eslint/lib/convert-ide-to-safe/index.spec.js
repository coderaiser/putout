'use strict';

const convertIdeToSafe = require('.');

const test = require('@putout/test')(__dirname, {
    'eslint/convert-ide-to-safe': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-ide-to-safe: report', (t) => {
    t.report('ide', 'Use "putout/safe" instead of "putout/ide"');
    t.end();
});

test('putout: plugin-eslint: convert-ide-to-safe: transform', (t) => {
    t.transform('ide');
    t.end();
});

test('putout: plugin-eslint: convert-ide-to-safe: no transform: no-extends', (t) => {
    t.noTransform('no-extends');
    t.end();
});

