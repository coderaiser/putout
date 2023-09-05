'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['set-docker-setup-buildx-version', plugin],
    ],
});

test('packages: set-docker-setup-buildx-version: report', (t) => {
    t.report('set-docker-setup-buildx-version', `Latest version of 'docker/setup-buildx-action' is missing`);
    t.end();
});

test('packages: set-docker-setup-buildx-version: transform', (t) => {
    t.transform('set-docker-setup-buildx-version');
    t.end();
});
