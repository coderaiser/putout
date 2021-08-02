'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-bind': require('.'),
});

test('plugin-react-hooks: remove-bind: report', (t) => {
    t.report('bind', `bind should not be used`);
    t.end();
});

test('plugin-react-hooks: remove-bind: transform', (t) => {
    t.transform('bind');
    t.end();
});

