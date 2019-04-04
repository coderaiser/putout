'use strict';

const test = require('@putout/test')(__dirname, {
    'test': require('.'),
});

test('plugin-madrun: transform', (t) => {
    t.transformCode(`path.get('hello')`, 'path.hello');
    t.end();
});

