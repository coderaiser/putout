'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'typescript/convert-commonjs-to-esm': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: convert-commonjs-to-esm: on', (t) => {
    t.transform('convert-commonjs-to-esm-on');
    t.end();
});
