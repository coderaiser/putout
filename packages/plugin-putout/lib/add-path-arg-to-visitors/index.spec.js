'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-path-arg-to-visitors', plugin],
    ],
});

test('putout: add-path-arg-to-visitors: report', (t) => {
    t.report('add-path-arg-to-visitors', `Add 'path' argument to 'traverse' visitors`);
    t.end();
});

test('putout: add-path-arg-to-visitors: transform', (t) => {
    t.transform('add-path-arg-to-visitors');
    t.end();
});

test('putout: add-path-arg-to-visitors: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('putout: add-path-arg-to-visitors: no report: not-referenced', (t) => {
    t.noReport('not-referenced');
    t.end();
});
