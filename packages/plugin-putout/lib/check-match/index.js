'use strict';

const {operator, types} = require('putout');

const {
    getTemplateValues,
    traverse,
} = operator;

const {isStringLiteral} = types;

const PATTERN_MATCH = 'module.exports.match = () => __object';
const PATTERN_REPLACE = 'module.exports.replace = () => __object';

module.exports.report = () => `☝️ Looks like 'match()' template absent in 'replace()'`;

module.exports.replace = () => ({
    [PATTERN_MATCH]: PATTERN_MATCH,
});

module.exports.match = () => ({
    [PATTERN_MATCH]: ({__object}, path) => {
        const namesMatch = [];
        
        for (const prop of __object.properties) {
            if (!isStringLiteral(prop.key))
                continue;
            
            namesMatch.push(prop.key.value);
        }
        
        const namesReplace = [];
        
        traverse(path.parentPath.parentPath, {
            [PATTERN_REPLACE]: (path) => {
                const {__object} = getTemplateValues(path, PATTERN_REPLACE);
                
                for (const prop of __object.properties) {
                    if (!isStringLiteral(prop.key))
                        continue;
                    
                    namesReplace.push(prop.key.value);
                }
            },
        });
        
        for (const name of namesMatch) {
            if (!namesReplace.includes(name))
                return true;
        }
        
        return false;
    },
});
