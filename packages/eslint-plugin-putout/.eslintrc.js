'use strict';

const {recommended} = require('.').configs;
const rules = cut(recommended.rules);

module.exports = {
    rules,
    extends: [
        'plugin:node/recommended',
        'plugin:eslint-plugin/recommended',
        '@putout',
    ],
    plugins: [
        'node',
        'eslint-plugin',
    ],
};

function cut(obj) {
    const entries = Object.entries(obj);
    const result = {};
    
    for (const [name, value] of entries) {
        const newName = name.replace('putout/', '');
        result[newName] = value;
    }
    
    return result;
}

