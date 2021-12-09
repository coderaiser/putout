'use strict';

const applyObjectDestructuring = require('.');

const test = require('@putout/test')(__dirname, {
    'apply-object-destructuring': applyObjectDestructuring,
});

test('plugin-apply-destructuring: no transform: member expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

