'use strict';

const {transform, transformAsync} = require('./transform');

module.exports.findPlaces = (ast, source, opts) => {
    return transform(ast, source, {
        ...opts,
        fix: false,
    });
};

module.exports.findPlacesAsync = async (ast, source, opts) => {
    return await transformAsync(ast, source, {
        ...opts,
        fix: false,
    });
};
