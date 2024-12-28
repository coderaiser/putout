'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-illegal-strict-mode', plugin],
    ],
});

test('lib: remove-illegal-strict-mode: report', (t) => {
    t.report('remove-illegal-strict-mode', `Avoid illegal 'use strict'`);
    t.end();
});

test('lib: remove-illegal-strict-mode: transform', (t) => {
    t.transform('remove-illegal-strict-mode');
    t.end();
});
