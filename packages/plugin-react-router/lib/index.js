import * as v7ApplyMemoryRouter from './v7-apply-memory-router/index.js';
import * as declare from './declare/index.js';
import * as v8ApplyReactRouterDom from './v8-apply-react-router-dom/index.js';
import * as v7RemoveUselessServer from './v7-remove-useless-server/index.js';
import * as v6ConvertSwitchToRoutes from './v6-convert-switch-to-routes/index.js';
import * as v6ConvertComponentToElement from './v6-convert-component-to-element/index.js';
import * as v7SplitMultiSegmentRoute from './v7-split-multi-segment-route/index.js';

export const rules = {
    'v6-convert-switch-to-routes': v6ConvertSwitchToRoutes,
    'v6-convert-component-to-element': v6ConvertComponentToElement,
    'v7-split-multi-segment-route': v7SplitMultiSegmentRoute,
    'v7-remove-useless-server': v7RemoveUselessServer,
    'v8-apply-react-router-dom': v8ApplyReactRouterDom,
    'declare': declare,
    'v7-apply-memory-router': v7ApplyMemoryRouter,
};
