import {createRemoveFiles} from '../create-remove-files.js';

export const {
    report,
    fix,
    scan,
} = createRemoveFiles(['*.swp', '*.swo']);
