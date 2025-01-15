'use strict';

const {createTest} = require('@putout/test');
const applyObjectDestructuring = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-object-destructuring', applyObjectDestructuring],
    ],
});

test('plugin-apply-destructuring: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

test('plugin-apply-destructuring: no transform: object-expression', (t) => {
    t.noTransform('object-expression');
    t.end();
});
