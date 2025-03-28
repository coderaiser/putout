import * as v6ConvertSwitchToRoutes from './v6-convert-switch-to-routes/index.js';
import * as v6ConvertComponentToElement from './v6-convert-component-to-element/index.js';
import * as v7SplitMultiSegmentRoute from './v7-split-multi-segment-route/index.js';

export const rules = {
    'v6-convert-switch-to-routes': v6ConvertSwitchToRoutes,
    'v6-convert-component-to-element': v6ConvertComponentToElement,
    'v7-split-multi-segment-route': v7SplitMultiSegmentRoute,
};
