import * as addMissing from './add-missing/index.js';
import * as removeUseless from './remove-useless/index.js';
import * as removeIllegal from './remove-illegal/index.js';

export const rules = {
    'add-missing': addMissing,
    'remove-useless': removeUseless,
    'remove-illegal': removeIllegal,
};
