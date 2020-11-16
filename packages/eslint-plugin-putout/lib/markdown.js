'use strict';

module.exports = [{
    files: '*.md{js}',
    rules: {
        'no-undef': 'off',
        'no-multi-spaces': 'off',
        'no-empty': 'off',
        'eol-last': 'off',
        'quotes': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'off',
        'node/no-missing-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
    },
}];

