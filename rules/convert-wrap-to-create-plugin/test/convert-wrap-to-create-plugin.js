'use strict';

const {createTest} = require('@putout/test');
const convertTraverseToInclude = require('..');

const test = createTest(__dirname, {
    'convert-wrap-to-create-plugin': convertTraverseToInclude,
});

test('putout: rules: convert-wrap-to-create-plugin: report', (t) => {
    t.report('convert-wrap-to-create-plugin', `Use 'createPlugin()' instead of 'wrap()'`);
    t.end();
});

test('putout: rules: convert-wrap-to-create-plugin: transform', (t) => {
    t.transform('convert-wrap-to-create-plugin');
    t.end();
});

