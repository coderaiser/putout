'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/remove-useless-regexp': require('.'),
});

test('plugin-regexp/remove-useless-regexp: report', (t) => {
    t.report('regexp', 'Remove useless RegExp, use strict equal operator insead');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: transform', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: transform: couple-chars', (t) => {
    t.transform('couple-chars');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: no transform: hard', (t) => {
    t.noTransform('hard');
    t.end();
});

