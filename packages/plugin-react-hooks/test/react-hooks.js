'use strict';

const {createTest} = require('@putout/test');

const rmUnused = require('@putout/plugin-remove-unused-variables');
const reactHooks = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['react-hooks', reactHooks],
    ],
});

test('plugin-react-hooks: transform: react-hooks', (t) => {
    t.transform('react-hooks', {
        'remove-unused-variables': rmUnused,
    });
    t.end();
});

test('plugin-react-hooks: transform: react-component', (t) => {
    t.transform('react-component', {
        'remove-unused-variables': rmUnused,
    });
    t.end();
});

test('plugin-react-hooks: transform: not-react', (t) => {
    t.transform('not-react');
    t.end();
});

test('plugin-react-hooks: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-react-hooks: transform: apply-short-fragment', (t) => {
    t.transform('apply-short-fragment');
    t.end();
});

test('plugin-react-hooks: transform: remove-react', (t) => {
    t.transform('remove-react', '\n');
    t.end();
});
