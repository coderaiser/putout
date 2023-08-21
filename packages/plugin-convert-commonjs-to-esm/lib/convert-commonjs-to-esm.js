'use strict';

const exportsRule = require('./exports');
const commonsRule = require('./commons');
const requireRule = require('./require');

module.exports.rules = {
    exports: exportsRule,
    require: requireRule,
    commons: commonsRule,
};
