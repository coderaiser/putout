import {is} from '../is.js';

const isPrimitive = (a) => typeof a !== 'object' || a === null;

export const comparePrimitives = (node, template) => {
    return isPrimitive(template) && !is(template) && template === node;
};
