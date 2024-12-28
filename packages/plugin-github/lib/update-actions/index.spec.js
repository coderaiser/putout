'use strict';

const {createTest} = require('@putout/test');
const plugin = require('./index.js');

const test = createTest(__dirname, {
    plugins: [
        ['github/update-actions', plugin],
    ],
});

test('plugin-github: update-actions: report', (t) => {
    t.report('set-coveralls-version', `Update action 'actions/checkout' to latest version`);
    t.end();
});

test('plugin-github: update-actions: transform: v2', (t) => {
    t.transform('set-coveralls-version');
    t.end();
});

test('plugin-github: update-actions: transform: docker-login', (t) => {
    t.transform('docker-login');
    t.end();
});

test('plugin-github: update-actions: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});

test('plugin-github: update-actions: transform: options', (t) => {
    t.transformWithOptions('options', {
        actions: {
            hello: 'v13',
        },
    });
    t.end();
});
