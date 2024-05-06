'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-provider', plugin],
    ],
});

test('react: remove-useless-provider: report', (t) => {
    t.report('remove-useless-provider', `Remove useless 'Provider': 'UseTheme.Provider' -> 'UseTheme'`);
    t.end();
});

test('react: remove-useless-provider: transform', (t) => {
    t.transform('remove-useless-provider');
    t.end();
});
