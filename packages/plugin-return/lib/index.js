'use strict';

const applyEarly = require('./apply-early');
const convertFromContinue = require('./convert-from-continue');
const convertFromBreak = require('./convert-from-break');
const mergeWithNextSibling = require('./merge-with-next-sibling');
const simplifyBoolean = require('./simplify-boolean');

module.exports.rules = {
    'apply-early': applyEarly,
    'convert-from-continue': convertFromContinue,
    'convert-from-break': convertFromBreak,
    'merge-with-next-sibling': mergeWithNextSibling,
    'simplify-boolean': simplifyBoolean,
};
