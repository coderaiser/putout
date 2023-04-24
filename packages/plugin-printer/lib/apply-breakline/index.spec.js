'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer/apply-breakline', plugin],
    ],
});

test('rule: apply-breakline: report', (t) => {
    t.report('apply-breakline', `breakline = newline + indent`);
    t.end();
});

test('rule: apply-breakline: transform', (t) => {
    t.transform('apply-breakline');
    t.end();
});
