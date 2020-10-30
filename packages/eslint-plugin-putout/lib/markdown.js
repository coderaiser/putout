'use strict';

module.exports = {
    plugins: [
        'node',
    ],
    overrides: [{
        files: ['*.md'],
        rules: {
            'no-undef': 'off',
            'eol-last': 'off',
            'quotes': 'off',
            'node/no-extraneous-require': 'off',
            'node/no-unpublished-require': 'off',
            'node/no-missing-require': 'off',
        },
    }],
};

