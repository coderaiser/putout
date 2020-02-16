'use strict';

module.exports = (places) => {
    const eslintPluginRegExp = /^eslint\/.*\/.*/;
    const putoutPluginRegExp = /^eslint\/putout\/.*/;
    
    for (const {rule} of places) {
        const isEslintPlugin = eslintPluginRegExp.test(rule);
        const isPutoutPlugin = putoutPluginRegExp.test(rule);
        
        if (isEslintPlugin && !isPutoutPlugin)
            return true;
    }
    
    return false;
};

