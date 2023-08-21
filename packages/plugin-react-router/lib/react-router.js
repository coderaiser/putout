'use strict';

const convertSwitchToRoutes = require('./convert-switch-to-routes');
const convertComponentToElement = require('./convert-component-to-element');

module.exports.rules = {
    'convert-switch-to-routes': convertSwitchToRoutes,
    'convert-component-to-element': convertComponentToElement,
};
