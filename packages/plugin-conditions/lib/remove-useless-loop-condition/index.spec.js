'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-loop-condition', plugin],
    ],
});

test('conditions: remove-useless-loop-condition: report', (t) => {
    t.report('remove-useless-loop-condition', `Avoid useless loop condition`);
    t.end();
});

test('conditions: remove-useless-loop-condition: transform', (t) => {
    t.transform('remove-useless-loop-condition');
    t.end();
});
