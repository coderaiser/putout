'use strict';

const {operator} = require('putout');

const isJSX = require('../is-jsx');
const {matchFiles} = operator;

module.exports = matchFiles({
    filename: '*.js',
    files: {
        '__name.js -> __name.jsx': isJSX,
    },
});
