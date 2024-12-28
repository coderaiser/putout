'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['apply-dot-notation', plugin],
    ],
});

test('putout: apply-dot-notation: report', (t) => {
    t.report('apply-dot-notation', `Use dot notation: '["c"]' -> '.c'`);
    t.end();
});

test('putout: apply-dot-notation: transform', (t) => {
    t.transform('apply-dot-notation');
    t.end();
});

test('putout: apply-dot-notation: transform: valid', (t) => {
    t.transform('valid');
    t.end();
});

test('putout: apply-dot-notation: no transform: not-valid', (t) => {
    t.noTransform('not-valid');
    t.end();
});
