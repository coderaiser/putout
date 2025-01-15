'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    rules: {
        'typescript/cts-file': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: cts-file: cts-file-on', (t) => {
    t.transform('cts-file-on');
    t.end();
});
