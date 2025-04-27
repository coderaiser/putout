import {addProperty} from '../add-property.js';

export const {
    report,
    fix,
    traverse,
} = addProperty('coverallsapp/github-action', 'continue-on-error', true);
