'use strict';

const {createTest} = require('@putout/test');
const removeUselessAssign = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-assign', removeUselessAssign],
    ],
});

test('plugin-remove-useless-assign: report: assign', (t) => {
    t.report('assign', `Avoid useless 'Object.assign()'`);
    t.end();
});

test('plugin-remove-useless-assign: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('plugin-remove-useless-assign: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});
