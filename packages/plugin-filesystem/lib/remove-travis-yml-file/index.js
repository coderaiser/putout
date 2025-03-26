import {createRemoveFiles} from '../create-remove-files.js';

const {
    report,
    fix,
    scan,
} = createRemoveFiles('.travis.yml');

export {
    report,
    fix,
    scan,
};
