'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-lowercase-to-node-builders', plugin],
    ],
});

test('putout: apply-lowercase-to-node-builders: report', (t) => {
    t.report('apply-lowercase-to-node-builders', `Use lowercased node builders`);
    t.end();
});

test('putout: apply-lowercase-to-node-builders: transform', (t) => {
    t.transform('apply-lowercase-to-node-builders');
    t.end();
});

test('putout: apply-lowercase-to-node-builders: no report: not-builder', (t) => {
    t.noReport('not-builder');
    t.end();
});
