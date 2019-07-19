'use strict';

const ignore = require('ignore');
const getRelativePath = require('../lib/get-relative-path');

module.exports = (dirOpt, resolvedName, options) => {
    const relativeName = getRelativePath(resolvedName, dirOpt);
    const ignorer = ignore();
    
    if (options.ignore)
        ignorer.add(options.ignore);
    
    return dirOpt && ignorer.ignores(relativeName);
};

