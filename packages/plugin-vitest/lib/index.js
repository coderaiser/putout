import * as convertJestToVitest from './convert-jest-to-vitest/index.js';
import * as applyHoisted from './apply-hoisted/index.js';
import * as v3ApplyOptionsAsSecondArgument from './v3-apply-options-as-second-argument/index.js';
import * as v3ApplyBrowserInstances from './v3-apply-browser-instances/index.js';

export const rules = {
    'v3-apply-options-as-second-argument': v3ApplyOptionsAsSecondArgument,
    'v3-apply-browser-instances': v3ApplyBrowserInstances,
    'apply-hoisted': applyHoisted,
    'convert-jest-to-vitest': convertJestToVitest,
};
