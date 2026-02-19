import {operator} from 'putout';

const {renameProperties} = operator;
const v41 = [
    ['esm/apply-index-to-import', ''],
];

const v40 = [
    ['putout/apply-index-to-import', 'esm/apply-index-to-import'],
];

const v37 = [
    ['convert-assert-to-with', 'esm/convert-assert-to-with'],
    ['remove-empty/import', 'esm/remove-empty-import'],
    ['remove-empty/export', 'esm/remove-empty-export'],
    ['group-imports-by-source', 'esm/group-imports-by-source'],
    ['declare-imports-first', 'esm/declare-imports-first'],
    ['remove-quotes-from-import-assertions', 'esm/remove-quotes-from-import-assertions'],
    ['sort-imports-by-specifiers', 'esm/sort-imports-by-specifiers'],
    ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
];

const versions = [
    ...v37,
    ...v40,
    ...v41,
];

export const {
    report,
    fix,
    traverse,
} = renameProperties(versions);
