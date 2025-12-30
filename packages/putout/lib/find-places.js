import {transform, transformAsync} from './transform.js';

export const findPlaces = (ast, source, opts) => {
    return transform(ast, source, {
        ...opts,
        fix: false,
    });
};

export const findPlacesAsync = async (ast, source, opts) => {
    return await transformAsync(ast, source, {
        ...opts,
        fix: false,
    });
};
