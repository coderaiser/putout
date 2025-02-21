import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import react from 'eslint-plugin-react';

export const jsx = {
    name: 'putout: jsx',
    rules: {
        '@stylistic/js/no-extra-parens': 'off',
        '@stylistic/jsx/jsx-indent': 'error',
        '@stylistic/jsx/jsx-wrap-multilines': ['error', {
            arrow: 'parens-new-line',
            return: 'parens-new-line',
            declaration: 'parens-new-line',
        }],
    },
    plugins: {
        react,
        '@stylistic/jsx': stylisticJsx,
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
