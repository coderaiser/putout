'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-test-to-spec', plugin],
    ],
});

test('packages: rename-test-to-spec: report', (t) => {
    t.report('rename-test-to-spec', `Rename '*.spec.*' to '.test.*'`);
    t.end();
});

test('packages: rename-test-to-spec: transform', (t) => {
    t.transform('rename-test-to-spec');
    t.end();
});
