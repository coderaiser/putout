'use strict';

const addMissingStar = require('./add-missing-star');
const convertMultiplyToGenerator = require('./convert-multiply-to-generator');

module.exports.rules = {
    'add-missing-star': addMissingStar,
    'convert-multiply-to-generator': convertMultiplyToGenerator,
};
