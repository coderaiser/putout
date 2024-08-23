'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-delete', plugin],
    ],
});

test('putout: remove-useless-delete: report', (t) => {
    t.report('remove-useless-delete', `Remove useless 'delete'`);
    t.end();
});

test('putout: remove-useless-delete: transform', (t) => {
    t.transform('remove-useless-delete');
    t.end();
});
