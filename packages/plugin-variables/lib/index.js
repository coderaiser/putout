import * as convertConstToLet from './convert-const-to-let/index.js';
import * as extractKeywords from './extract-keywords/index.js';
import * as removeUseless from './remove-useless/index.js';
import * as removeUselessAssignment from './remove-useless-assignment/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as removeUselessDuplicates from './remove-useless-duplicates/index.js';
import * as removeUselessRename from './remove-useless-rename/index.js';
import * as removeUnreferenced from './remove-unreferenced/index.js';
import * as removeUnused from './remove-unused/index.js';
import * as splitDeclarations from './split-declarations/index.js';

export const rules = {
    'convert-const-to-let': convertConstToLet,
    'extract-keywords': extractKeywords,
    'remove-useless': removeUseless,
    'remove-useless-assignment': removeUselessAssignment,
    'remove-useless-declarations': removeUselessDeclarations,
    'remove-useless-duplicates': removeUselessDuplicates,
    'remove-useless-rename': removeUselessRename,
    'remove-unreferenced': removeUnreferenced,
    'remove-unused': removeUnused,
    'split-declarations': splitDeclarations,
};
