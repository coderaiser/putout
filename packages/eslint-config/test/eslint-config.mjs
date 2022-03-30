import {createTest} from '@putout/test/eslint';
const test = createTest(import.meta.url);

test('eslint-config: operator-linebreak', async ({process}) => {
    await process('operator-linebreak');
});

test('eslint-config: padding-export', async ({process}) => {
    await process('padding-export');
});

test('eslint-config: padding-import', async ({process}) => {
    await process('padding-import');
});

test('eslint-config: padding-function', async ({process}) => {
    await process('padding-function');
});

test('eslint-config: padding-throw', async ({process}) => {
    await process('padding-throw');
});

test('eslint-config: padding-for-of', async ({process}) => {
    await process('padding-for-of');
});

test('eslint-config: lines-class-members', async ({noProcess}) => {
    await noProcess('lines-class-members');
});

test('eslint-config: no-unsafe-negation', async ({comparePlaces}) => {
    await comparePlaces('no-unsafe-negation', []);
});

