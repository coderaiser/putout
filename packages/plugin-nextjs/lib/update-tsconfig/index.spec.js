'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['update-tsconfig', plugin],
    ],
});

test('packages: update-tsconfig: report', (t) => {
    t.report('update-tsconfig', `Update 'tsconfig.json'`);
    t.end();
});

test('packages: update-tsconfig: transform', (t) => {
    t.transform('update-tsconfig');
    t.end();
});
