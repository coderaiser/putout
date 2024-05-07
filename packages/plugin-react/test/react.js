'use strict';

const {createTest} = require('@putout/test');
const react = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: remove-useless-provider', (t) => {
    t.transform('remove-useless-provider');
    t.end();
});

test('plugin-react: transform: remove-implicit-ref-return', (t) => {
    t.transform('remove-implicit-ref-return');
    t.end();
});

test('plugin-react: transform: remove-useless-forward-ref', (t) => {
    t.transform('remove-useless-forward-ref');
    t.end();
});

test('plugin-react: transform: apply-create-root', (t) => {
    t.transform('apply-create-root');
    t.end();
});
