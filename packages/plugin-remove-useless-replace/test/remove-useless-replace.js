'use strict';

const {createTest} = require('@putout/test');
const removeUselessAssign = require('..');

const test = createTest(__dirname, {
    'remove-useless-replace': removeUselessAssign,
});

test('plugin-remove-useless-replace: report', (t) => {
    t.report('replace', `Avoid useless 'replace()'`);
    t.end();
});

test('plugin-remove-useless-replace: transform', (t) => {
    t.transform('replace');
    t.end();
});

