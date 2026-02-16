import {createRenameProperty} from '../rename-property.js';

export const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['filesystem/remove-travis-yml', 'filesystem/remove-file'],
    ['filesystem/remove-vim-swap-file', 'filesystem/remove-file'],
    ['filesystem/remove-nyc-output-file', 'filesystem/remove-file'],
    ['filesystem/remove-ds-store-file', 'filesystem/remove-file'],
    ['filesystem/remove-empty-directory', 'filesystem/remove-file'],
]);
