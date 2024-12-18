'use strict';

const removeArgs = require('./remove-args');
const applyBreakline = require('./apply-breakline');
const applyLinebreak = require('./apply-linebreak');
const applyComputedPrint = require('./apply-computed-print');
const addArgs = require('./add-args');
const declare = require('./declare');

module.exports.rules = {
    'remove-args': removeArgs,
    'apply-breakline': applyBreakline,
    'apply-linebreak': applyLinebreak,
    'apply-computed-print': applyComputedPrint,
    'add-args': addArgs,
    declare,
};
