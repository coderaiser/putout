'use strict';

const js = require('@eslint/js');

module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            globalReturn: true,
        },
    },
    plugins: [
        '@stylistic/js',
    ],
    rules: {
        ...js.configs.recommended.rules,
        'arrow-parens': [
            'error',
            'always',
        ],
        'dot-notation': 'error',
        'object-shorthand': 'error',
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
        'no-delete-var': 'off',
        'no-unused-labels': 'off',
        'no-else-return': ['error', {
            allowElseIf: false,
        }],
        'no-var': 'error',
        'no-unneeded-ternary': ['error', {
            defaultAssignment: false,
        }],
        'no-useless-return': 'error',
        'no-implicit-coercion': ['error', {
            allow: ['~'],
        }],
        'no-constant-binary-expression': 'off',
        'no-unused-private-class-members': 'off',
        'no-unsafe-negation': 'off',
        'no-duplicate-case': 'off',
        'no-cond-assign': 'off',
        'no-empty-pattern': 'off',
        'no-control-regex': 'off',
        'no-useless-rename': 'error',
        'no-use-before-define': 'off',
        'no-process-exit': 'off',
        'nonblock-statement-body-position': [
            'error',
            'below',
        ],
        'lines-around-directive': 'error',
        '@stylistic/js/array-bracket-spacing': 'error',
        '@stylistic/js/arrow-spacing': 'error',
        '@stylistic/js/brace-style': 'error',
        '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/js/comma-spacing': 'error',
        '@stylistic/js/eol-last': [
            'error',
            'always',
        ],
        '@stylistic/js/func-call-spacing': 'error',
        '@stylistic/js/operator-linebreak': ['error', 'after', {
            overrides: {
                '=': 'none',
                '|': 'before',
                '||': 'before',
                ':': 'before',
                '?': 'before',
            },
        }],
        '@stylistic/js/function-paren-newline': ['error', 'multiline-arguments'],
        '@stylistic/js/key-spacing': 'error',
        '@stylistic/js/newline-per-chained-call': 'error',
        '@stylistic/js/space-infix-ops': ['error', {
            int32Hint: false,
        }],
        '@stylistic/js/indent': [
            'error',
            4,
        ],
        '@stylistic/js/space-in-parens': 'error',
        '@stylistic/js/space-before-blocks': 'error',
        '@stylistic/js/space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
        '@stylistic/js/implicit-arrow-linebreak': 'error',
        '@stylistic/js/quotes': ['error', 'single', {
            allowTemplateLiterals: true,
        }],
        '@stylistic/js/quote-props': ['error', 'consistent-as-needed'],
        '@stylistic/js/semi': 'error',
        '@stylistic/js/no-extra-semi': 'error',
        '@stylistic/js/object-curly-spacing': 'error',
        '@stylistic/js/no-extra-parens': ['error', 'all', {
            enforceForSequenceExpressions: false,
        }],
        '@stylistic/js/no-multi-spaces': 'error',
        '@stylistic/js/no-trailing-spaces': ['error', {
            skipBlankLines: true,
        }],
        '@stylistic/js/no-multiple-empty-lines': ['error', {
            max: 1,
            maxBOF: 0,
        }],
        '@stylistic/js/lines-between-class-members': 'off',
        '@stylistic/js/linebreak-style': [
            'error',
            'unix',
        ],
        '@stylistic/js/padded-blocks': [
            'error',
            'never',
        ],
        '@stylistic/js/padding-line-between-statements': [
            'error',
            ...getPaddingExport(),
            ...getPaddingCjsExport(),
            ...getPaddingImport(),
            ...getPaddingCjsImport(),
            ...getPaddingIf(),
            ...getPaddingFor(), {
                blankLine: 'always',
                prev: 'while',
                next: 'return',
            }, {
                blankLine: 'always',
                prev: '*',
                next: 'while',
            }, {
                blankLine: 'always',
                prev: '*',
                next: 'function',
            }, {
                blankLine: 'any',
                prev: 'cjs-export',
                next: 'function',
            }],
        'require-atomic-updates': 'off',
        'yoda': 'off',
    },
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

function getPaddingIf() {
    return [{
        blankLine: 'always',
        prev: '*',
        next: 'if',
    }, {
        blankLine: 'always',
        prev: 'if',
        next: '*',
    }];
}

function getPaddingFor() {
    return [{
        blankLine: 'always',
        prev: 'for',
        next: 'return',
    }, {
        blankLine: 'always',
        prev: 'block-like',
        next: 'for',
    }, {
        blankLine: 'always',
        prev: [
            'const',
            'let',
        ],
        next: 'for',
    }, {
        blankLine: 'always',
        prev: 'for',
        next: '*',
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
