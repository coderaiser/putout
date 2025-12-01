import * as removeUseless from './remove-useless/index.js';
import * as removeUselessAssignment from './remove-useless-assignment/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as removeUselessDuplicates from './remove-useless-duplicates/index.js';
import * as removeUselessRename from './remove-useless-rename/index.js';

export const rules = {
    'remove-useless': removeUseless,
    'remove-useless-assignment': removeUselessAssignment,
    'remove-useless-declarations': removeUselessDeclarations,
    'remove-useless-duplicates': removeUselessDuplicates,
    'remove-useless-rename': removeUselessRename,
};
