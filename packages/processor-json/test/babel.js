import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    printer: 'babel',
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

test('putout: processor: json: babel: eslintrc', async ({process}) => {
    await process('eslintrc');
});

test('putout: processor: json: babel: package', async ({process}) => {
    await process('package', ['package-json']);
});
