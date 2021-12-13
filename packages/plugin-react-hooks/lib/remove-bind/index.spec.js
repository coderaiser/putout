'use strict';

const {createTest} = require('@putout/test');
const removeBind = require('.');

const test = createTest(__dirname, {
    'remove-bind': removeBind,
});

test('plugin-react-hooks: remove-bind: report', (t) => {
    t.report('bind', `bind should not be used`);
    t.end();
});

test('plugin-react-hooks: remove-bind: transform', (t) => {
    t.transform('bind');
    t.end();
});

