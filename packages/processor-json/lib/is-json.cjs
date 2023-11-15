'use strict';

const {__json_name} = require('@putout/operator-json');

module.exports.isJSON = (source) => !source.indexOf(__json_name);
