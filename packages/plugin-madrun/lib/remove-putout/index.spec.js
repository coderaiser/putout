'use strict';

const test = require('@putout/test')(__dirname, {
    'madrun/remove-putout': require('.'),
});

test('madrun: remove putout: report', (t) => {
    t.report('putout', `scripts should not have a name "putout", because "putout" is "lint"`);
    t.end();
});

test('madrun: remove putout: transform: eslint', (t) => {
    t.transform('putout');
    t.end();
});

test('madrun: remove putout: transform: template', (t) => {
    t.noTransform('no-putout');
    t.end();
});

