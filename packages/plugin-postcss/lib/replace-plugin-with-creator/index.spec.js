'use strict';

const {createTest} = require('@putout/test');
const replacePluginWithCreator = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['postcss/replace-plugin-with-creator', replacePluginWithCreator],
    ],
});

test('plugin-postcss: report: export', (t) => {
    t.report('export', `creator should be used instead of plugin`);
    t.end();
});

test('plugin-postcss: transform: export', (t) => {
    t.transform('export');
    t.end();
});
