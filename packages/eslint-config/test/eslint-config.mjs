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

test('eslint-config: padding-if', async ({process}) => {
    await process('padding-if');
});

test('eslint-config: lines-class-members', async ({noProcess}) => {
    await noProcess('lines-class-members');
});

test('eslint-config: no-unused-private-class-members: off', async ({comparePlaces}) => {
    await comparePlaces('no-unused-private-class-members', []);
});

test('eslint-config: no-unsafe-negation: off', async ({comparePlaces}) => {
    await comparePlaces('no-unsafe-negation', []);
});

test('eslint-config: no-constant-binary-expression: off', async ({comparePlaces}) => {
    await comparePlaces('no-constant-binary-expression', []);
});

test('eslint-config: array-bracket-spacing', async ({process}) => {
    await process('array-bracket-spacing');
});

test('eslint-config: no-extra-parens', async ({comparePlaces}) => {
    await comparePlaces('no-extra-parens', []);
});

test('eslint-config: no-unused-labels', async ({comparePlaces}) => {
    await comparePlaces('no-unused-labels', []);
});

test('eslint-config: no-delete-var', async ({comparePlaces}) => {
    await comparePlaces('no-delete-var', [], {
        rules: {
            'no-var': 'off',
        },
        parserOptions: {
            ecmaVersion: 3,
            sourceType: 'script',
            babelOptions: {
                sourceType: 'script',
            },
        },
    });
});
