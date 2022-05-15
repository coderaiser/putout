'use strict';

const {assign} = Object;
const getRuleByType = (a) => a === 'module' ? 'convert-commonjs-to-esm' : 'convert-esm-to-commonjs';

module.exports = ({type}, options) => {
    const rule = getRuleByType(type);
    const js = '*.js';
    
    assign(options, {
        match: {
            ...options.match,
            [js]: {
                ...options.match?.[js],
                [rule]: 'on',
            },
            '.eslintrc.json': {
                ...options.match?.['.eslintrc.json'],
                'eslint': 'on',
                'eslint/convert-require-to-import': type === 'module' ? 'on' : 'off',
            },
        },
    });
};

