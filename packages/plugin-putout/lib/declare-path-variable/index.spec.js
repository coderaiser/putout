'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['declare-path-variable', plugin],
    ],
});

test('putout: declare-path-variable: report', (t) => {
    t.report('declare-path-variable', `Declare 'path' variable`);
    t.end();
});

test('putout: declare-path-variable: transform', (t) => {
    t.transform('declare-path-variable');
    t.end();
});
