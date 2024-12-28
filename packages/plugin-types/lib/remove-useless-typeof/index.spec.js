'use strict';

const {createTest} = require('@putout/test');
const removeUselessTypeof = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-typeof', removeUselessTypeof],
    ],
});

test('plugin-remove-useless-typeof: report', (t) => {
    t.report('typeof-typeof', `Avoid useless 'typeof'`);
    t.end();
});

test('plugin-remove-useless-typeof: transform', (t) => {
    t.transform('typeof-typeof');
    t.end();
});
