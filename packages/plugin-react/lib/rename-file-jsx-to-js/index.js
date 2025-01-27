'use strict';

const {operator} = require('putout');
const isJSX = require('../is-jsx');

const {matchFiles} = operator;

module.exports = matchFiles({
    filename: '*.jsx',
    files: {
        '__name.jsx -> __name.js': isJSX,
    },
});
