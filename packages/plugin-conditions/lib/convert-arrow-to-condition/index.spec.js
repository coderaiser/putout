'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-arrow-to-condition', plugin],
    ],
});

test('conditions: convert-arrow-to-condition: report', (t) => {
    t.report('convert-arrow-to-condition', `Use 'condition' instead of 'arrow function'`);
    t.end();
});

test('conditions: convert-arrow-to-condition: transform', (t) => {
    t.transform('convert-arrow-to-condition');
    t.end();
});
