import {addProperty} from '../add-property.js';

const {
    report,
    fix,
    traverse,
} = addProperty('coverallsapp/github-action', 'continue-on-error', true);

export {
    report,
    fix,
    traverse,
};
