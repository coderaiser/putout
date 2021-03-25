'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-object-destructuring': require('.'),
});

test('plugin-apply-destructuring: no transform: member expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

