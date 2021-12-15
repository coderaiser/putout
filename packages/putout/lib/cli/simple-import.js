'use strict';

// yarn doesn't understand how simport works
// https://github.com/coderaiser/putout/issues/93

module.exports = async (url) => (await import(url)).default;

