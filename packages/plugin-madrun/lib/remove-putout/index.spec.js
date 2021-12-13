'use strict';

const {createTest} = require('@putout/test');
const removePutout = require('.');

const test = createTest(__dirname, {
    'madrun/remove-putout': removePutout,
});

test('madrun: remove putout: report', (t) => {
    t.report('putout', `scripts should not have a name "putout", because "putout" is "lint"`);
    t.end();
});

test('madrun: remove putout: transform: eslint', (t) => {
    t.transform('putout');
    t.end();
});

test('madrun: remove putout: no transform: template', (t) => {
    t.noTransform('no-putout');
    t.end();
});

test('madrun: remove putout: no transform: computed', (t) => {
    t.noTransform('computed');
    t.end();
});

