'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    rules: {
        'typescript/mts-file': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: mts-file: on', (t) => {
    t.transform('mts-file-on');
    t.end();
});
