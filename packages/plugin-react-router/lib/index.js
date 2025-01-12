'use strict';

const v6ConvertSwitchToRoutes = require('./v6-convert-switch-to-routes');
const v6ConvertComponentToElement = require('./v6-convert-component-to-element');
const v7SplitMultiSegmentRoute = require('./v7-split-multi-segment-route');

module.exports.rules = {
    'v6-convert-switch-to-routes': v6ConvertSwitchToRoutes,
    'v6-convert-component-to-element': v6ConvertComponentToElement,
    'v7-split-multi-segment-route': v7SplitMultiSegmentRoute,
};
