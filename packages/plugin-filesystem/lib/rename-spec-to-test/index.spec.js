'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-spec-to-test', plugin],
    ],
});

test('packages: rename-spec-to-test: report', (t) => {
    t.report('rename-spec-to-test', `Rename '*.spec.*' to '*.test.*'`);
    t.end();
});

test('packages: rename-spec-to-test: transform', (t) => {
    t.transform('rename-spec-to-test');
    t.end();
});
