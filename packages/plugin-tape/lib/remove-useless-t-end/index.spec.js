'use strict';

const {createTest} = require('@putout/test');
const removeUselessTEnd = require('.');

const test = createTest(__dirname, {
    'tape/remove-useless-t-end': removeUselessTEnd,
});

test('plugin-tape: remove-useless-t-end: report', (t) => {
    t.report('t-end', `Avoid useless 't.end()'`);
    t.end();
});

test('plugin-tape: remove-useless-t-end: transform', (t) => {
    t.transform('t-end');
    t.end();
});

