import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'json',
    processors: [
        'json',
    ],
    plugins: [
        'eslint',
    ],
});

test('putout: processor: json: eslintrc', async ({process}) => {
    await process('eslintrc');
});

test('putout: processor: json: package', async ({process}) => {
    await process('package', ['package-json']);
});

