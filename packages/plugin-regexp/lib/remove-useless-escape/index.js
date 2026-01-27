import * as regexp from './regexp.js';
import {createRegExp} from '../create-regexp.js';

export const {
    report,
    fix,
    traverse,
} = createRegExp(regexp);
