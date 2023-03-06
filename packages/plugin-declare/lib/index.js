'use strict';

const {operator} = require('putout');
const declarations = require('./declarations');

const {declare} = operator;

module.exports = declare(declarations);
