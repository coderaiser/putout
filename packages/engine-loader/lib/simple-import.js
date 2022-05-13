'use strict';

// How in other way to mock import using mock require in CommonJS?
module.exports.simpleImportDefault = async (url) => (await import(url)).default;

