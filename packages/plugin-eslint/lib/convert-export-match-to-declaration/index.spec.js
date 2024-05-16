'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-export-match-to-decleration', plugin],
    ],
});

test('eslint: convert-export-match-to-decleration: report', (t) => {
    t.report('convert-export-match-to-declaration', `Export 'match' at end of file in CommonJS`);
    t.end();
});

test('eslint: convert-export-match-to-decleration: transform', (t) => {
    t.transform('convert-export-match-to-declaration');
    t.end();
});
