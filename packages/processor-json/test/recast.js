import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    printer: 'recast',
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

test('putout: processor: json: recast: eslintrc', async ({process}) => {
    await process('eslintrc');
});

test('putout: processor: json: recast: package', async ({process}) => {
    await process('package', ['package-json']);
});
