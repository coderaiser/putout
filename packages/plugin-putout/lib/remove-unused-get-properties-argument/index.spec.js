'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-unused-get-properties-argument', plugin],
    ],
});

test('putout: remove-unused-get-properties-argument: report', (t) => {
    t.report('remove-unused-get-properties-argument', `Remove unused property 'extends' from 'getProperties()' arguments`);
    t.end();
});

test('putout: remove-unused-get-properties-argument: no report: computed', (t) => {
    t.noReport('computed');
    t.end();
});

test('putout: remove-unused-get-properties-argument: no-destructuring', (t) => {
    t.noReport('no-destructuring');
    t.end();
});

test('putout: remove-unused-get-properties-argument: transform', (t) => {
    t.transform('remove-unused-get-properties-argument');
    t.end();
});
