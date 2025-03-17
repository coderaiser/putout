'use strict';

const rename = require('./rename');
const remove = require('./remove');
const destruct = require('./destruct');
const declaration = require('./declaration');
const duplicate = require('./duplicate');
const assignment = require('./assignment');

module.exports.rules = {
    rename,
    remove,
    destruct,
    declaration,
    duplicate,
    assignment,
};
