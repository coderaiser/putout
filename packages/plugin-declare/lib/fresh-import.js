'use strict';

module.exports = {
    freshImport: 'const freshImport = ((count) => (name) => import(`${name}?count=${++count}`))(0)',
    freshImportDefault: 'const freshImportDefault = ((count) => async (name) => (await import(`${name}?count=${++count}`)).default)(0)',
};
