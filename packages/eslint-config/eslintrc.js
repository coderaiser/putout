'use strict';

module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            globalReturn: true,
        },
    },
    rules: {
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': 'error',
        'brace-style': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'error',
        'dot-notation': 'error',
        'eol-last': ['error', 'always'],
        'func-call-spacing': 'error',
        'operator-linebreak': ['error', 'before', {
            overrides: {
                '=': 'none',
            },
        }],
        'function-paren-newline': ['error', 'multiline-arguments'],
        'key-spacing': 'error',
        'space-infix-ops': ['error', {
            int32Hint: false,
        }],
        'space-in-parens': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
        'prefer-arrow-callback': 'error',
        'prefer-const': ['error', {
            destructuring: 'all',
        }],
        'prefer-destructuring': ['error', {
            AssignmentExpression: {
                array: true,
                object: false,
            },
        }],
        'indent': ['error', 4],
        'implicit-arrow-linebreak': 'error',
        'quotes': ['error', 'single', {
            allowTemplateLiterals: true,
        }],
        'quote-props': ['error', 'consistent-as-needed'],
        'semi': 'error',
        'object-shorthand': 'error',
        'object-curly-spacing': 'error',
        'no-implicit-coercion': ['error', {
            allow: ['~'],
        }],
        'no-duplicate-case': 'off',
        'no-cond-assign': 'off',
        'no-empty-pattern': 'off',
        'no-control-regex': 'off',
        'no-useless-rename': 'error',
        'no-use-before-define': 'off',
        'no-process-exit': 'off',
        'no-var': 'error',
        'no-extra-parens': 'error',
        'no-multi-spaces': 'error',
        'no-else-return': ['error', {
            allowElseIf: false,
        }],
        'no-trailing-spaces': ['error', {
            skipBlankLines: true,
        }],
        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxBOF: 0,
        }],
        'no-unneeded-ternary': ['error', {
            defaultAssignment: false,
        }],
        'no-useless-return': 'error',
        'nonblock-statement-body-position': ['error', 'below'],
        'lines-around-directive': 'error',
        'lines-between-class-members': 'error',
        'linebreak-style': ['error', 'unix'],
        'padded-blocks': ['error', 'never'],
        'padding-line-between-statements': ['error',
            ...getPaddingExport(),
            ...getPaddingCjsExport(),
            ...getPaddingImport(),
            ...getPaddingCjsImport(),
            {
                blankLine: 'always',
                prev: 'block-like',
                next: 'for',
            }, {
                blankLine: 'always',
                prev: '*',
                next: 'if',
            }, {
                blankLine: 'always',
                prev: 'if',
                next: 'return',
            }, {
                blankLine: 'always',
                prev: 'if',
                next: 'expression',
            }, {
                blankLine: 'always',
                prev: 'if',
                next: 'const',
            }, {
                blankLine: 'always',
                prev: 'for',
                next: 'return',
            }, {
                blankLine: 'always',
                prev: 'while',
                next: 'return',
            }, {
                blankLine: 'always',
                prev: '*',
                next: 'while',
            }],
        'require-atomic-updates': 'off',
        'yoda': 'error',
    },
    extends: [
        'eslint:recommended',
    ],
};

function getPaddingExport() {
    return [{
        blankLine: 'always',
        prev: 'export',
        next: 'function',
    }, {
        blankLine: 'always',
        prev: 'function',
        next: 'export',
    }, {
        blankLine: 'always',
        prev: 'const',
        next: 'export',
    }, {
        blankLine: 'always',
        prev: 'export',
        next: 'const',
    }];
}

function getPaddingImport() {
    return [{
        blankLine: 'always',
        prev: 'import',
        next: 'function',
    }, {
        blankLine: 'always',
        prev: 'function',
        next: 'import',
    }];
}

function getPaddingCjsExport() {
    return [{
        blankLine: 'always',
        prev: 'function',
        next: 'export',
    }, {
        blankLine: 'always',
        prev: 'const',
        next: 'export',
    }, {
        blankLine: 'always',
        prev: 'export',
        next: 'const',
    }];
}

function getPaddingCjsImport() {
    return getPaddingImport().map(addCJS);
}

function addCJS({blankLine, prev, next}) {
    if (/export|import/.test(prev))
        prev = `cjs-${prev}`;
    
    if (/export|import/.test(next))
        next = `cjs-${next}`;
    
    return {
        blankLine,
        prev,
        next,
    };
}

