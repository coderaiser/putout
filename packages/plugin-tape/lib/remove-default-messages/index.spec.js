'use strict';

const {createTest} = require('@putout/test');
const removeDefaultMessages = require('.');

const test = createTest(__dirname, {
    'tape/remove-default-messages': removeDefaultMessages,
});

test('plugin-tape: remove-default-messages: report', (t) => {
    t.report('operator', 'Avoid passing default messages to operators');
    t.end();
});

test('plugin-tape: remove-default-messages: transform', (t) => {
    t.transform('operator');
    t.end();
});

test('plugin-tape: remove-default-messages: transform: deep-equal', (t) => {
    t.transform('deep-equal');
    t.end();
});

