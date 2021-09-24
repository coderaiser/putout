'use strict';

const reactHooks = require('..');
const rmUnused = require('@putout/plugin-remove-unused-variables');
const test = require('@putout/test')(__dirname, {
    'react-hooks': reactHooks,
});

test('plugin-react-hooks: transform', (t) => {
    t.transform('react-hooks', {
        'remove-unused-variables': rmUnused,
    });
    t.end();
});

test('plugin-react-hooks: transform: React.Component', (t) => {
    t.transform('react-component', {
        'remove-unused-variables': rmUnused,
    });
    t.end();
});

test('plugin-react-hooks: transform: not react', (t) => {
    t.transform('not-react');
    t.end();
});

