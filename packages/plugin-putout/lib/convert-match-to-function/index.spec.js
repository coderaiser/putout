'use strict';

const {createTest} = require('@putout/test');
const convertReplaceToFunction = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/convert-match-to-function', convertReplaceToFunction],
    ],
});

test('plugin-putout: convert-match-to-function: report', (t) => {
    t.report('convert-match-to-function', `'match' should be a function`);
    t.end();
});

test('plugin-putout: convert-match-to-function: transform', (t) => {
    t.transform('convert-match-to-function');
    t.end();
});
