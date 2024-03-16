'use strict';

const {createTest} = require('@putout/test');
const convertOkToCalledWith = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/convert-ok-to-called-with', convertOkToCalledWith],
    ],
});

test('plugin-tape: convert-ok-to-called-with: report', (t) => {
    t.report('ok', `Use 't.calledWith()' instead of 't.ok()'`);
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: transform', (t) => {
    t.transform('ok');
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: transform: message', (t) => {
    t.transform('message');
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});
