'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-promises', plugin],
    ],
});

test('putout-config: apply-promises: report', (t) => {
    t.report('apply-promises', `Rename property: 'remove-useless-variables/await' -> 'promises/remove-useless-variables'`);
    t.end();
});

test('putout-config: apply-promises: transform', (t) => {
    t.transform('apply-promises');
    t.end();
});
