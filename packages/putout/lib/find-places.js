import {transform, transformAsync} from './transform.js';

export const findPlaces = (ast, opts) => {
    return transform(ast, {
        ...opts,
        fix: false,
    });
};

export const findPlacesAsync = async (ast, opts) => {
    return await transformAsync(ast, {
        ...opts,
        fix: false,
    });
};
