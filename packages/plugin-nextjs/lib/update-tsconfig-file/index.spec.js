'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['update-tsconfig-file', plugin],
    ],
});

test('packages: update-tsconfig-file: report', (t) => {
    t.report('update-tsconfig-file', `Update 'tsconfig.json'`);
    t.end();
});

test('packages: update-tsconfig-file: transform', (t) => {
    t.transform('update-tsconfig-file');
    t.end();
});
