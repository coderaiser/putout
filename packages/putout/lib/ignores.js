'use strict';

const {relative} = require('path');
const ignore = require('ignore');

module.exports = (dirOpt, resolvedName, options = {}) => {
    const relativeName = relative(dirOpt, resolvedName);
    const ignorer = ignore();
    
    if (options.ignore)
        ignorer.add(options.ignore);
    
    return dirOpt && ignorer.ignores(relativeName);
};
