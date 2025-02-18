'use strict';

module.exports.simpleImport = async (url) => {
    const data = await import(url);
    
    return data.default || data;
};
