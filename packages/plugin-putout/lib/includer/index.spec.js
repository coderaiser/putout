'use strict';

const {createTest} = require('@putout/test');
const addArgs = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/includer', addArgs],
    ],
});

test('plugin-putout: includer: report', (t) => {
    t.report('includer', 'Includer functions should return array (https://git.io/Jyndl)');
    t.end();
});

test('plugin-putout: includer: transform', (t) => {
    t.transform('includer');
    t.end();
});

test('plugin-putout: includer: transform: not-fn', (t) => {
    t.transform('not-fn');
    t.end();
});
