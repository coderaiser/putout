import * as convertGetLocalToLocalGet from './convert-get-local-to-local-get.js';
import * as convertSetLocalToLocalSet from './convert-set-local-to-local-set.js';

export const rules = [
    ['convert-get-local-to-local-get', convertGetLocalToLocalGet],
    ['convert-set-local-to-local-set', convertSetLocalToLocalSet],
];
