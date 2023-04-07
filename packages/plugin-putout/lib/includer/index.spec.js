'use strict';

const {createTest} = require('@putout/test');
const addArgs = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
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
