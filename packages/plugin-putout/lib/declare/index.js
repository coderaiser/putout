'use strict';

const declare = require('@putout/plugin-declare-undefined-variables/declare');
const declarations = require('./declarations');

module.exports = declare(declarations);

