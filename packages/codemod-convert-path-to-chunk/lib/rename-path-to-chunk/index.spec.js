'use strict';

const test = require('@putout/test')(__dirname, {
    'test': require('.'),
});

test('plugin-madrun: rename ', (t) => {
    t.transformCode(`(path) => path`, '(chunk) => chunk');
    t.end();
});

