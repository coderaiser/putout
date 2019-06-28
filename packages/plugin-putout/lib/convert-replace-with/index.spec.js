'use strict';

const test = require('@putout/test')(__dirname, {
    'test': require('.'),
});

test('plugin-putout: report', (t) => {
    t.report('replace-with', `"operate.replaceWith" should be called instead of "path.replaceWith"`);
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('replace-with');
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('replace-with-exists');
    t.end();
});

