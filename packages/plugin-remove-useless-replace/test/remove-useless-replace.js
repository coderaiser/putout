'use strict';

const {createTest} = require('@putout/test');
const removeUselessAssign = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-replace', removeUselessAssign],
    ],
});

test('plugin-remove-useless-replace: report: replace', (t) => {
    t.report('replace', `Avoid useless 'replace()'`);
    t.end();
});

test('plugin-remove-useless-replace: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});
