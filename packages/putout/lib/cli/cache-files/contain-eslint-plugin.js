'use strict';

module.exports = (places) => {
    const eslintPluginRegExp = /^eslint\/.*\/.*/;
    
    for (const {rule} of places) {
        if (eslintPluginRegExp.test(rule))
            return true;
    }
    
    return false;
};

