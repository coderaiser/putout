'use strict';

const test = require('@putout/test')(__dirname, {
    'postcss/replace-plugin-with-creator': require('.'),
});

test('plugin-putout: report', (t) => {
    t.report('export', `creator should be used instead of plugin`);
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('export');
    t.end();
});

