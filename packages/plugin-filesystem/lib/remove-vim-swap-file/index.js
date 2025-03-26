import {createRemoveFiles} from '../create-remove-files.js';

const {
    report,
    fix,
    scan,
} = createRemoveFiles('*.swp');

export {
    report,
    fix,
    scan,
};
