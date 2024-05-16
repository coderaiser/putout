'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-export-match-to-declaration', plugin],
    ],
});

test('eslint: convert-export-match-to-declaration: report', (t) => {
    t.report('convert-export-match-to-declaration', `Export 'match' at end of file in CommonJS`);
    t.end();
});

test('eslint: convert-export-match-to-declaration: transform', (t) => {
    t.transform('convert-export-match-to-declaration');
    t.end();
});
