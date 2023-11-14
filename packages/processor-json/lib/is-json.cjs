'use strict';

const {__json} = require('@putout/operator-json');

module.exports.isJSON = (source) => !source.indexOf(__json);
