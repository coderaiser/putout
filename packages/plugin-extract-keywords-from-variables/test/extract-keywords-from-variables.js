'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['extract-keywords-from-variables', plugin],
    ],
});

test('putout: extract-keywords-from-variables: report', (t) => {
    t.report('extract-keywords-from-variables', `Extract 'export' from variable`);
    t.end();
});

test('putout: extract-keywords-from-variables: transform', (t) => {
    t.transform('extract-keywords-from-variables');
    t.end();
});
