import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import {rules} from '@putout/eslint-config';

export const jsx = {
    name: 'putout: jsx',
    rules: {
        ...rules,
        '@stylistic/no-extra-parens': 'off',
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
