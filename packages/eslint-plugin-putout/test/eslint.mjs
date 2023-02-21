import {createTest} from '@putout/test/eslint';
const test = createTest(import.meta.url);

test('eslint-plugin-putout: no-resolve: places', async ({comparePlaces}) => {
    await comparePlaces('no-unresolved-message', [{
        message: 'Always add an extension to relative imports',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    }]);
});

test('eslint-plugin-putout: no-resolve: fix', async ({process}) => {
    await process('no-unresolved');
});

test('eslint-plugin-putout: no-resolve: dynamic', async ({process}) => {
    await process('no-unresolved-dynamic');
});

test('eslint-plugin-putout: no-resolve: dynamic: message', async ({comparePlaces}) => {
    await comparePlaces('no-unresolved-dynamic', [{
        message: 'Always add an extension to relative imports',
        position: {
            column: 16,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    }]);
});

test('eslint-plugin-putout: evaluate: fix', async ({process}) => {
    await process('evaluate');
});

test('eslint-plugin-putout: tape-add-newline-before-assertion', async ({process}) => {
    await process('tape-add-newline-before-assertion');
});

test('eslint-plugin-putout: tape-add-newline-between-tests', async ({process}) => {
    await process('tape-add-newline-between-tests');
});

test('eslint-plugin-putout: tape-remove-newline-before-t-end', async ({process}) => {
    await process('tape-remove-newline-before-t-end');
});

test('eslint-plugin-putout: remove-empty-newline-after-last-specifier', async ({process}) => {
    await process('remove-empty-newline-after-last-specifier');
});

test('eslint-plugin-putout: remove-empty-newline-after-last-element', async ({process}) => {
    await process('remove-empty-newline-after-last-element');
});

test('eslint-plugin-putout: remove-empty-newline-before-first-specifier', async ({process}) => {
    await process('remove-empty-newline-before-first-specifier');
});

test('eslint-plugin-putout: remove-newline-from-empty-object', async ({process}) => {
    await process('remove-newline-from-empty-object');
});

test('eslint-plugin-putout: add-newlines-between-types-in-union', async ({process}) => {
    await process('add-newlines-between-types-in-union');
});

test('eslint-plugin-putout: add-newline-before-function-call', async ({process}) => {
    await process('add-newline-before-function-call');
});

test('eslint-plugin-putout: add-newline-after-function-call', async ({process}) => {
    await process('add-newline-after-function-call');
});

test('eslint-plugin-putout: add-newline-after-function-call-couple-newlines', async ({process}) => {
    await process('add-newline-after-function-call-couple-newlines');
});

test('eslint-plugin-putout: array-element-newline', async ({process}) => {
    await process('array-element-newline');
});

test('eslint-plugin-putout: config: padding-line-between-statements', async ({process}) => {
    await process('padding-line-between-statements');
});

test('eslint-plugin-putout: config: padding-line-ts', async ({process}) => {
    await process('padding-line-ts');
});

test('eslint-plugin-putout: newlines-around-function-call', async ({process}) => {
    await process('newlines-around-function-call');
});

test('eslint-plugin-putout: ts: semi', async ({process}) => {
    await process('semi');
});

test('eslint-plugin-putout: space-in-parens', async ({process}) => {
    await process('space-in-parens');
});

test('eslint-plugin-putout: ts: type-annotation-spacing', async ({process}) => {
    await process('type-annotation-spacing');
});

test('eslint-plugin-putout: ts: disabled', async ({comparePlaces}) => {
    await comparePlaces('ts-disabled', []);
});

test('eslint-plugin-putout: ts: duplicate', async ({comparePlaces}) => {
    await comparePlaces('ts-duplicate', [{
        message: `'Stub' is already defined.`,
        position: {
            column: 9,
            line: 2,
        },
        rule: '@typescript-eslint/no-redeclare (eslint)',
    }]);
});

test('eslint-plugin-putout: remove-empty-specifiers', async ({process}) => {
    await process('remove-empty-specifiers');
});

test('eslint-plugin-putout: remove-empty-newline-after-import', async ({process}) => {
    await process('remove-empty-newline-after-import');
});

test('eslint-plugin-putout: nonblock-statement-body-newline', async ({process}) => {
    await process('nonblock-statement-body-newline');
});

test('eslint-plugin-putout: strict-mode', async ({process}) => {
    await process('strict-mode', {
        rules: {
            'putout/putout': ['error', {
                ignore: [
                    '!**/fixture',
                ],
                rules: {
                    'remove-unused-expressions': 'on',
                },
            }],
        },
    });
});

test('eslint-plugin-putout: esm-to-cjs', async ({process}) => {
    await process('esm-to-cjs', {
        rules: {
            'putout/putout': ['error', {
                ignore: [
                    '!**/fixture',
                ],
                rules: {
                    'convert-esm-to-commonjs': 'on',
                },
            }],
        },
    });
});

test('eslint-plugin-putout: typescript: disable padding-between-private-members', async ({noProcess}) => {
    await noProcess('padding-between-private-members');
});

test('eslint-plugin-putout: remove-duplicate-extension', async ({process}) => {
    await process('remove-duplicate-extensions');
});

test('eslint-plugin-putout: add-newlines-between-specifiers', async ({process}) => {
    await process('add-newlines-between-specifiers');
});

test('eslint-plugin-putout: object-property-newline', async ({process}) => {
    await process('object-property-newline');
});

test('eslint-plugin-putout: add-newline-before-return', async ({process}) => {
    await process('add-newline-before-return');
});

test('eslint-plugin-putout: multiple-properties-destructuring', async ({process}) => {
    await process('multiple-properties-destructuring');
});

test('eslint-plugin-putout: remove-newline-between-declarations', async ({process}) => {
    await process('remove-newline-between-declarations');
});

