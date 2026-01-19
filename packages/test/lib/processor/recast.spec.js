import {createTest} from './index.js';

const test = createTest(import.meta.url, {
    printer: 'recast',
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

test('putout: test: processor: printer: process', async ({process}) => {
    await process('eslintrc');
});
