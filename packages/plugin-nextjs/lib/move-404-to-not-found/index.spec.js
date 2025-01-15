'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['move-404-to-not-found', plugin],
    ],
});

test('packages: move-404-to-not-found: report', (t) => {
    t.report('move-404-to-not-found', `Rename 'pages/404.js' to 'not-found.js'`);
    t.end();
});

test('packages: move-404-to-not-found: transform', (t) => {
    t.transform('move-404-to-not-found');
    t.end();
});

test('packages: move-404-to-not-found: no transform: no-404', (t) => {
    t.noTransform('no-404');
    t.end();
});
