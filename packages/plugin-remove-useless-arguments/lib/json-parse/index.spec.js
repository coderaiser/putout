'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['json-parse', plugin],
    ],
});

test('remove-useless-arguments: json-parse: report', (t) => {
    t.report('json-parse', `Avoid useless arguments in 'JSON.parse()'`);
    t.end();
});

test('remove-useless-arguments: json-parse: transform', (t) => {
    t.transform('json-parse');
    t.end();
});
