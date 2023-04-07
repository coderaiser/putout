'use strict';

const {createTest} = require('@putout/test');
const convertDestructuringToIdentifier = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/convert-destructuring-to-identifier', convertDestructuringToIdentifier],
    ],
});

test('plugin-putout: convert-destructuring-to-identifier: report: destructuring', (t) => {
    t.report('destructuring', 'Identifier should be used instead of empty destructuring');
    t.end();
});

test('plugin-putout: convert-destructuring-to-Identifier: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-putout: convert-destructuring-to-Identifier: transform: match', (t) => {
    t.transform('match');
    t.end();
});
