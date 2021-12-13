'use strict';

const {createTest} = require('@putout/test');
const applyObjectDestructuring = require('.');

const test = createTest(__dirname, {
    'apply-object-destructuring': applyObjectDestructuring,
});

test('plugin-apply-destructuring: no transform: member expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

