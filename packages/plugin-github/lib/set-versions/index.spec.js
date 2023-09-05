'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['github/set-coveralls-version', plugin],
    ],
});

test('plugin-github: set coveralls versions: report', (t) => {
    t.report('set-coveralls-version', `Latest version of 'actions/setup-node' is missing`);
    t.end();
});

test('plugin-github: set coveralls versions: transform: v2', (t) => {
    t.transform('set-coveralls-version');
    t.end();
});

test('plugin-github: set-versions: transform: options', (t) => {
    t.transformWithOptions('options', {
        actions: {
            hello: 'v13',
        },
    });
    t.end();
});
