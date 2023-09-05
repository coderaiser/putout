'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['github/set-docker-build-push-version', plugin],
    ],
});

test('plugin-github: set docker-build-push versions: report', (t) => {
    t.report('set-docker-build-push-version', `Latest version of 'docker/build-push-action' is missing`);
    t.end();
});

test('plugin-github: set docker-build-push versions: transform: v2', (t) => {
    t.transform('set-docker-build-push-version');
    t.end();
});
