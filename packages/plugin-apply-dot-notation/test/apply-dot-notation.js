'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-dot-notation', plugin],
    ],
});

test('putout: apply-dot-notation: report', (t) => {
    t.report('apply-dot-notation', `Use dot notation: '[c]' -> '.c'`);
    t.end();
});

test('putout: apply-dot-notation: transform', (t) => {
    t.transform('apply-dot-notation');
    t.end();
});
