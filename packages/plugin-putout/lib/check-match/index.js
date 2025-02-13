'use strict';

const {operator, types} = require('putout');

const {
    getTemplateValues,
    traverse,
} = operator;

const {isStringLiteral} = types;

const PATTERN_MATCH = 'module.exports.match = () => __object';
const PATTERN_REPLACE = 'module.exports.replace = () => __object';
const PATTERN_REPLACE_RETURN = 'module.exports.replace = (__args) => __body';

module.exports.report = () => `☝️ Looks like 'match()' template absent in 'replace()'`;

module.exports.replace = () => ({
    [PATTERN_MATCH]: PATTERN_MATCH,
});

module.exports.match = () => ({
    [PATTERN_MATCH]: ({__object}, path) => {
        const namesMatch = getNames(__object);
        const namesReplace = [];
        
        traverse(path.parentPath.parentPath, {
            [PATTERN_REPLACE_RETURN]: (path) => {
                const {__body} = getTemplateValues(path, PATTERN_REPLACE_RETURN);
                const object = __body.body.at(-1).argument;
                
                namesReplace.push(...getNames(object));
            },
            [PATTERN_REPLACE]: (path) => {
                const {__object} = getTemplateValues(path, PATTERN_REPLACE);
                namesReplace.push(...getNames(__object));
            },
        });
        
        for (const name of namesMatch) {
            if (!namesReplace.includes(name))
                return true;
        }
        
        return false;
    },
});

function getNames({properties}) {
    const names = [];
    
    for (const prop of properties) {
        if (!isStringLiteral(prop.key))
            continue;
        
        names.push(prop.key.value);
    }
    
    return names;
}
