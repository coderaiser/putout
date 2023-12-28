'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'typescript/find-file': ['on', {
            ignore: [],
        }],
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: find-file', (t) => {
    t.transform('find-file');
    t.end();
});

const testIgnore = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'typescript/find-file': ['on', {
            ignore: ['*.ts'],
        }],
    },
    plugins: [
        ['typescript', typescript],
    ],
});

testIgnore('plugin-typescript: no transform: find-file: ignore', (t) => {
    t.noTransform('find-file-ignore');
    t.end();
});
