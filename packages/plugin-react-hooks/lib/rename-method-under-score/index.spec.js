'use strict';

const renameMethodUnderScore = require('.');

const test = require('@putout/test')(__dirname, {
    'rename-method-under-score': renameMethodUnderScore,
});

test('plugin-react-hooks: rename-method-under-score: report', (t) => {
    t.report('method', `name of method "_submit" should not start from under score`);
    t.end();
});

test('plugin-react-hooks: rename-method-unuder-score: transform', (t) => {
    t.transform('method');
    t.end();
});

