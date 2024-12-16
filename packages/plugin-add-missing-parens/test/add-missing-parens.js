'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-missing-parens', plugin],
    ],
});

test('putout: add-missing-parens: report', (t) => {
    t.report('add-missing-parens', `Add missing parens: invalid tagged template on optional chain`);
    t.end();
});

test('putout: add-missing-parens: no report: no-chain', (t) => {
    t.noReport('no-chain');
    t.end();
});

test('putout: add-missing-parens: transform', (t) => {
    t.transform('add-missing-parens');
    t.end();
});

test('putout: add-missing-parens: transform: non-null', (t) => {
    t.transform('non-null');
    t.end();
});

test('putout: add-missing-parens: transform: await', (t) => {
    t.transform('await');
    t.end();
});
