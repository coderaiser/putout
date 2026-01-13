import {mergeOptions} from './merge-options.js';

const {assign} = Object;

export default ({type}, options) => {
    const config = type === 'module' ? esm() : commonjs();
    assign(options, mergeOptions(options, config));
};

const commonjs = () => ({
    match: {
        '*.js': {
            'nodejs/convert-esm-to-commonjs': 'on',
            'nodejs/add-missing-strict-mode': 'on',
            'nodejs/remove-useless-strict-mode': 'off',
        },
        '.eslintrc.json': {
            'eslint': 'on',
            'eslint/convert-require-to-import': 'off',
        },
    },
});

const esm = () => ({
    match: {
        '*.js': {
            'nodejs/convert-commonjs-to-esm': 'on',
            'nodejs/add-missing-strict-mode': 'off',
            'nodejs/remove-useless-strict-mode': 'on',
        },
        '.eslintrc.json': {
            'eslint': 'on',
            'eslint/convert-require-to-import': 'on',
        },
    },
});
