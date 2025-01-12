'use strict';

const {createTest} = require('@putout/test');
const reactRouter = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['react-router', reactRouter],
    ],
});

test('plugin-react-hooks: transform: v6-convert-switch-to-routes', (t) => {
    t.transform('v6-convert-switch-to-routes');
    t.end();
});

test('plugin-react-hooks: transform: v6-convert-component-to-element', (t) => {
    t.transform('v6-convert-component-to-element');
    t.end();
});

test('plugin-react-router: transform: v7-split-multi-segment-route', (t) => {
    t.transform('v7-split-multi-segment-route');
    t.end();
});
