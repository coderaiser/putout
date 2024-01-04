'use strict';

const {operator} = require('putout');
const {__json_name} = operator;

module.exports.report = () => `Convert '*.json' to '*.js'`;

module.exports.replace = () => ({
    [`${__json_name}(__object)`]: 'export default __object',
});
