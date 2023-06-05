'use strict';

// How in other way to mock import using mock require in CommonJS?
module.exports.simpleImport = async (url) => {
    const result = await import(url);
    return result.default || result;
};
