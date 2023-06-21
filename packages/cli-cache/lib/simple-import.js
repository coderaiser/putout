'use strict';

module.exports.simpleImport = async (url) => (await import(url)).default;
