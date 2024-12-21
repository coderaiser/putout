'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-quotes-from-import-assertions', plugin],
    ],
});

test('putout: remove-quotes-from-import-assertions: report', (t) => {
    t.report('remove-quotes-from-import-assertions', `Remove quotes from import assertions`);
    t.end();
});

test('putout: remove-quotes-from-import-assertions: transform', (t) => {
    t.transform('remove-quotes-from-import-assertions');
    t.end();
});
