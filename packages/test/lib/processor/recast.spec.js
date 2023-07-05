'use strict';

const {createTest} = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

test('putout: test: processor: printer: process', async ({process}) => {
    await process('eslintrc');
});
