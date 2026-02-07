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

test('eslint-config: no-empty', async ({comparePlaces}) => {
    await comparePlaces('no-empty', []);
});

test('eslint-config: object-shorthand', async ({comparePlaces}) => {
    await comparePlaces('object-shorthand', []);
});

test('eslint-config: no-prototype-builtins', async ({comparePlaces}) => {
    await comparePlaces('no-prototype-builtins', []);
});

test('eslint-config: indent-switch', async ({comparePlaces}) => {
    await comparePlaces('indent-switch', []);
});

test('eslint-config: no-delete-var', async ({comparePlaces}) => {
    await comparePlaces('no-delete-var', [], {
        rules: {
            'no-var': 'off',
        },
        languageOptions: {
            ecmaVersion: 3,
            sourceType: 'script',
            parserOptions: {
                requireConfigFile: 'false',
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    sourceType: 'script',
                },
            },
        },
    });
});

test('eslint-config: space-before-function-paren', async ({process}) => {
    await process('space-before-function-paren');
});

test('eslint-config: using', async ({comparePlaces}) => {
    await comparePlaces('using', []);
});

test('eslint-config: keyword-spacing', async ({process}) => {
    await process('keyword-spacing');
});

test('eslint-config: dot-notation', async ({comparePlaces}) => {
    await comparePlaces('dot-notation', []);
});

test('eslint-config: no-debugger', async ({comparePlaces}) => {
    await comparePlaces('no-debugger', []);
});

test('eslint-config: no-unused-vars', async ({comparePlaces}) => {
    await comparePlaces('no-unused-vars', []);
});

test('eslint-config: no-unassigned-vars', async ({comparePlaces}) => {
    await comparePlaces('no-unassigned-vars', []);
});
