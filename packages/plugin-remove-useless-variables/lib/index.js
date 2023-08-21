'use strict';

const rename = require('./rename');
const remove = require('./remove');
const destruct = require('./destruct');
const declaration = require('./declaration');

module.exports.rules = {
    rename,
    remove,
    destruct,
    declaration,
};
