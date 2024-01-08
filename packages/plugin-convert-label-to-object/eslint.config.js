'use strict';

const {recommended} = require('eslint-plugin-putout/config');

module.exports = [...recommended, {
    rules: {
        'no-unused-labels': 'off',
    }
}]
