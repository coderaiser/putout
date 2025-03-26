import {createRemoveFiles} from '../create-remove-files.js';

const {
    report,
    fix,
    scan,
} = createRemoveFiles('.nyc_output');

export {
    report,
    fix,
    scan,
};
