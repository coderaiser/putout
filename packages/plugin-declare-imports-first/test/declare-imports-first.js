'use strict';

const {operator} = require('putout');

const {createTest} = require('@putout/test');

const plugin = require('..');
const {remove} = operator;

const test = createTest(__dirname, {
    'declaration-imports-first': plugin,
});

test('plugin-declaration-imports-first: report', (t) => {
    t.report('declaration', `Declare imports first`);
    t.end();
});

test('plugin-declaration-imports-first: transform', (t) => {
    t.transform('declaration');
    t.end();
});

test('plugin-declaration-imports-first: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: () => '',
            include: () => ['ImportDeclaration'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});

