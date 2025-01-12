'use strict';

const {createTest} = require('@putout/test');
const reactRouter = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['react-router', reactRouter],
    ],
});

test('plugin-react-hooks: transform: convert-switch-to-routes', (t) => {
    t.transform('convert-switch-to-routes');
    t.end();
});

test('plugin-react-hooks: transform: convert-component-to-element', (t) => {
    t.transform('convert-component-to-element');
    t.end();
});

test('plugin-react-router: transform: v7-split-multi-segment-route', (t) => {
    t.transform('v7-split-multi-segment-route');
    t.end();
});
