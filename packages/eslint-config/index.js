import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export const rules = {
    ...js.configs.recommended.rules,
    'arrow-parens': [
        'error',
        'always',
    ],
    'dot-notation': 'error',
    'no-global-assign': 'off',
    'object-shorthand': 'off',
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
    'no-prototype-builtins': 'off',
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
    'no-empty': 'off',
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
    '@stylistic/array-bracket-spacing': 'error',
    '@stylistic/arrow-spacing': 'error',
    '@stylistic/brace-style': 'error',
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/comma-spacing': 'error',
    '@stylistic/eol-last': [
        'error',
        'always',
    ],
    '@stylistic/function-call-spacing': 'error',
    '@stylistic/operator-linebreak': ['error', 'after', {
        overrides: {
            '=': 'none',
            '|': 'before',
            '||': 'before',
            '&&': 'before',
            ':': 'before',
            '?': 'before',
        },
    }],
    '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
    '@stylistic/key-spacing': 'error',
    '@stylistic/newline-per-chained-call': 'error',
    '@stylistic/space-infix-ops': ['error', {
        int32Hint: false,
    }],
    '@stylistic/indent': ['error', 4, {
        SwitchCase: 0,
    }],
    '@stylistic/space-in-parens': 'error',
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
    }],
    '@stylistic/implicit-arrow-linebreak': 'error',
    '@stylistic/quotes': ['error', 'single', {
        allowTemplateLiterals: true,
    }],
    '@stylistic/quote-props': ['error', 'consistent-as-needed'],
    '@stylistic/semi': 'error',
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/object-curly-spacing': 'error',
    '@stylistic/no-extra-parens': ['error', 'all', {
        enforceForSequenceExpressions: false,
    }],
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-trailing-spaces': ['error', {
        skipBlankLines: true,
    }],
    '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxBOF: 0,
    }],
    '@stylistic/lines-between-class-members': 'off',
    '@stylistic/linebreak-style': [
        'error',
        'unix',
    ],
    '@stylistic/padded-blocks': [
        'error',
        'never',
    ],
    '@stylistic/padding-line-between-statements': [
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
};

export default [{
    name: '@putout/eslint-config',
    rules,
    plugins: {
        '@stylistic': stylistic,
    },
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
        globals: {
            ...globals.browser,
            ...globals.node,
        },
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                globalReturn: true,
            },
        },
    },
}];

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
