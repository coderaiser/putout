'use strict';

const test = require('@putout/test')(__dirname, {
    'test': require('.'),
});

test('plugin-madrun: rename ', (t) => {
    t.transformCode(`path.node.hi`, 'path.hi');
    t.end();
});

