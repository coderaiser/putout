import * as typescript from './index.js';
import filesystem from './filesystem.js';

export const rules = {
    ...typescript.rules,
    ...filesystem,
};
