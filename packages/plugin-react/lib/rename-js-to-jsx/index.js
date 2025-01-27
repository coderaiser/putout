'use strict';

const {operator} = require('putout');
const noop = () => {};
const {matchFiles} = operator;

const isJSX = {
    report: () => '',
    fix: noop,
    include: () => ['JSXElement'],
};

module.exports = matchFiles({
    filename: '*.js',
    files: {
        '__name.js -> __name.jsx': isJSX,
    },
});
