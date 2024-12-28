'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-context-to-source', plugin],
    ],
});

test('packages: convert-context-to-source: report', (t) => {
    t.report('convert-context-to-source', `Use 'source' instead of 'context'`);
    t.end();
});

test('packages: convert-context-to-source: transform', (t) => {
    t.transform('convert-context-to-source');
    t.end();
});
