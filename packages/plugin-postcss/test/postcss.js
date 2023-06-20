'use strict';

const {createTest} = require('@putout/test');
const postcss = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['postcss', postcss],
    ],
});

test('plugin-postcss: transform: replace-plugin-with-creator', (t) => {
    t.transform('export');
    t.end();
});
