import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['filesystem/remove-travis-yml', 'filesystem/remove-file'],
    ['filesystem/remove-vim-swap-file', 'filesystem/remove-file'],
    ['filesystem/remove-nyc-output-file', 'filesystem/remove-file'],
    ['filesystem/remove-ds-store-file', 'filesystem/remove-file'],
    ['filesystem/remove-empty-directory', 'filesystem/remove-file'],
]);
