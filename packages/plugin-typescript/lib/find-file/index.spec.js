'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['find-file', plugin],
    ],
});

test('putout: plugin-typescript: find-file: report', (t) => {
    t.report('find-file', `Remove useless type when declaring constant with primitive value`);
    t.end();
});

test('putout: plugin-typescript: find-file: transform', (t) => {
    t.transform('find-file');
    t.end();
});
