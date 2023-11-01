'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-break', plugin],
    ],
});

test('putout: remove-useless-break: report', (t) => {
    t.report('remove-useless-break', `Avoid useless 'break'`);
    t.end();
});

test('putout: remove-useless-break: transform', (t) => {
    t.transform('remove-useless-break');
    t.end();
});
