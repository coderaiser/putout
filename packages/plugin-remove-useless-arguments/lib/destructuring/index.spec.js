'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-arguments/destructuring': require('.'),
});

test('plugin-remove-useless-arguments: no report', (t) => {
    t.noReport('spread');
    t.end();
});

test('plugin-remove-useless-arguments: no transform', (t) => {
    t.noTransform('spread');
    t.end();
});

