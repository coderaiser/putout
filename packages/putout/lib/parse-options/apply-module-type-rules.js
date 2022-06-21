'use strict';

const merge = require('../merge');
const {assign} = Object;

module.exports = ({type}, options) => {
    const rules = type === 'module' ? esm() : commonjs();
    assign(options, merge(options, rules));
};

function commonjs() {
    return {
        match: {
            '*.js': {
                'convert-esm-to-commonjs': 'on',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'off',
            },
        },
    };
}

function esm() {
    return {
        match: {
            '*.js': {
                'convert-commonjs-to-esm': 'on',
                'strict-mode/add-missing': 'off',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'on',
            },
        },
    };
}
