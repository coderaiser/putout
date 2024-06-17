'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-assignment-to-declaration', plugin],
    ],
});

test('putout: convert-assignment-to-declaration: report', (t) => {
    t.report('convert-assignment-to-declaration', `Declare 'a' before assignment`);
    t.end();
});

test('putout: convert-assignment-to-declaration: transform', (t) => {
    t.transform('convert-assignment-to-declaration');
    t.end();
});
