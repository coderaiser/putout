'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/remove-default-messages': require('.'),
});

test('plugin-tape: remove-default-messages: report', (t) => {
    t.report('operator', 'Avoid passing default messages to operators');
    t.end();
});

test('plugin-tape: remove-default-messages: transform', (t) => {
    t.transform('operator');
    t.end();
});

