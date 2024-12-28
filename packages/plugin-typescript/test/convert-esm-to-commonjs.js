'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    rules: {
        'typescript/convert-esm-to-commonjs': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: convert-esm-to-commonjs: on', (t) => {
    t.transform('convert-esm-to-commonjs-on');
    t.end();
});
