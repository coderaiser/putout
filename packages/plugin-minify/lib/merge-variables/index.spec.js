'use strict';

const {createTest} = require('@putout/test');

const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['merge-variables', plugin],
    ],
});

test('plugin-minify: merge-variables: report', (t) => {
    t.report('merge-variables', `Merge variables`);
    t.end();
});

test('plugin-minify: merge-variables: transform', (t) => {
    t.transform('merge-variables');
    t.end();
});
