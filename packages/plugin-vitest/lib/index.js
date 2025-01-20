'use strict';

const v3ApplyOptionsAsSecondArgument = require('./v3-apply-options-as-second-argument');
const v3ApplyBrowserInstances = require('./v3-apply-browser-instances');

module.exports.rules = {
    'v3-apply-options-as-second-argument': v3ApplyOptionsAsSecondArgument,
    'v3-apply-browser-instances': v3ApplyBrowserInstances,
};
