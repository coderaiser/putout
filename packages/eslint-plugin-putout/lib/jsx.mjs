import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';

export const jsx = {
    name: 'putout: jsx',
    rules: {
        '@stylistic/no-extra-parens': 'off',
        '@stylistic/jsx-indent': 'error',
        '@stylistic/jsx-wrap-multilines': ['error', {
            arrow: 'parens-new-line',
            return: 'parens-new-line',
            declaration: 'parens-new-line',
        }],
    },
    plugins: {
        react,
        '@stylistic': stylistic,
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
};

export default [{
    files: ['**/*.jsx'],
    ...jsx,
}];
