import {createRemoveFiles} from '../create-remove-files.js';

const {
    report,
    fix,
    scan,
} = createRemoveFiles(['*.swp', '*.swo']);

export {
    report,
    fix,
    scan,
};
