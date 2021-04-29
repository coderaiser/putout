'use strict';

const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    extension: 'json',
    processors: [
        'json',
    ],
    plugins: [
        'eslint',
    ],
});

test('putout: processor: json', async (t) => {
    await t.process('eslintrc');
});

test('putout: processor: json', async (t) => {
    await t.process('package', ['package-json']);
});

