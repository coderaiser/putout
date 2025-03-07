import {createRequire} from 'node:module';
import {createPlugin} from '@putout/eslint/create-plugin';

const require = createRequire(import.meta.url);

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

const getWrapRule = (a) => ({
    [a]: createPlugin(require(`./${a}`)),
});

export const rules = {
    ...getWrapRule('array-element-newline'),
    ...getWrapRule('single-property-destructuring'),
    ...getWrapRule('multiple-properties-destructuring'),
    ...getWrapRule('for-of-multiple-properties-destructuring'),
    ...getWrapRule('long-properties-destructuring'),
    ...getWrapRule('destructuring-as-function-argument'),
    ...getWrapRule('align-spaces'),
    ...getWrapRule('keyword-spacing'),
    ...getWrapRule('newline-function-call-arguments'),
    ...getWrapRule('function-declaration-paren-newline'),
    ...getWrapRule('add-newlines-between-types-in-union'),
    ...getWrapRule('add-newlines-between-specifiers'),
    ...getWrapRule('add-newline-before-return'),
    ...getWrapRule('add-newline-before-function-call'),
    ...getWrapRule('add-newline-after-function-call'),
    ...getWrapRule('remove-newline-after-default-import'),
    ...getWrapRule('remove-newline-from-empty-object'),
    ...getWrapRule('remove-empty-newline-before-first-specifier'),
    ...getWrapRule('remove-empty-newline-after-last-specifier'),
    ...getWrapRule('remove-empty-newline-after-last-element'),
    ...getWrapRule('remove-empty-specifiers'),
    ...getWrapRule('objects-braces-inside-array'),
    ...getWrapRule('object-property-newline'),
    ...getWrapRule('no-unresolved'),
    ...getWrapRule('remove-duplicate-extensions'),
    ...getWrapRule('evaluate'),
    ...getWrapRule('tape-add-newline-before-assertion'),
    ...getWrapRule('tape-add-newline-between-tests'),
    ...getWrapRule('tape-remove-newline-before-t-end'),
    ...getWrapRule('nonblock-statement-body-newline'),
    ...getRule('putout'),
    ...getRule('remove-empty-newline-after-import'),
    ...getRule('remove-empty-newline-between-declarations'),
};
