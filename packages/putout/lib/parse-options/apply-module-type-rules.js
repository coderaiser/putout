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
                'nodejs/convert-esm-to-commonjs': 'on',
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
                'nodejs/convert-commonjs-to-esm': 'on',
                'nodejs/add-strict-mode': 'off',
            },
            '{test,*.spec.js}': {
                'tape/convert-mock-require-to-mock-import': 'on',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'on',
            },
        },
    };
}
