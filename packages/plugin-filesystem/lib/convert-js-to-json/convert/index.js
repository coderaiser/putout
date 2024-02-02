'use strict';

const {operator} = require('putout');
const {__json} = operator;

module.exports.report = () => `Convert '*.js' to '*.json'`;

module.exports.replace = () => ({
    'export default __object': __json,
    'module.exports = __object': __json,
});
