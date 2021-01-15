'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/remove-useless-group': require('.'),
});

test('plugin-regexp/remove-useless-group: report', (t) => {
    t.report('regexp', `Remove useless group from RegExp /\\.(ab)/, use /\\.ab/`);
    t.end();
});

test('plugin-regexp/remove-useless-group: transform', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: same-length', (t) => {
    t.noTransform('disjunction');
    t.end();
});

