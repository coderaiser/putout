'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-include-to-traverse', plugin],
    ],
});

test('putout: convert-include-to-traverse: report', (t) => {
    t.report('convert-include-to-traverse', `Use 'traverse' instead of 'include'`);
    t.end();
});

test('putout: convert-include-to-traverse: transform', (t) => {
    t.transform('convert-include-to-traverse');
    t.end();
});

test('putout: convert-include-to-traverse: no transform: not-object', (t) => {
    t.noTransform('not-object');
    t.end();
});
