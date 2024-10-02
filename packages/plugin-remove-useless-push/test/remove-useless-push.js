'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-push', plugin],
    ],
});

test('putout: remove-useless-push: report', (t) => {
    t.report('remove-useless-push', `Avoid useless 'push()' to array `);
    t.end();
});

test('putout: remove-useless-push: transform', (t) => {
    t.transform('remove-useless-push');
    t.end();
});
