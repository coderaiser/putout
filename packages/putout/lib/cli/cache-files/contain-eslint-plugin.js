'use strict';

const eslintPluginRegExp = /\/.*\s\(eslint\)$/;
const putoutPluginRegExp = /^putout\/.*\s\(eslint\)$/;

module.exports = (places) => {
    for (const {rule} of places) {
        const isEslintPlugin = eslintPluginRegExp.test(rule);
        const isPutoutPlugin = putoutPluginRegExp.test(rule);
        
        if (isEslintPlugin && !isPutoutPlugin)
            return true;
    }
    
    return false;
};

