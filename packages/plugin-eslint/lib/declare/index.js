import eslintFlat from './eslint-flat.js';
import configHelpers from './config-helpers.js';

export const declare = () => ({
    ...eslintFlat,
    ...configHelpers,
    safeAlign: `import {safeAlign} from 'eslint-plugin-putout'`,
});
