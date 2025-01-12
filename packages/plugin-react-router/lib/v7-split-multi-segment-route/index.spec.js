'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['v7-split-multi-segment-route', plugin],
    ],
});

test('react-router: v7-split-multi-segment-route: report', (t) => {
    t.report('v7-split-multi-segment-route', `Split multi-segment splat <Route`);
    t.end();
});

test('react-router: v7-split-multi-segment-route: transform', (t) => {
    t.transform('v7-split-multi-segment-route');
    t.end();
});
