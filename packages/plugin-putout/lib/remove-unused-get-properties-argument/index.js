'use strict';

const {operator, types} = require('putout');
const {isObjectPattern} = types;
const {
    getTemplateValues,
    remove,
} = operator;

const GET_PROPERTIES = 'const __a = getProperties(__b, __c)';

module.exports.report = ({name}) => `Remove unused property '${name}' from 'getProperties()' arguments`;

module.exports.fix = ({path}) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    [GET_PROPERTIES]: (path) => {
        const {__a} = getTemplateValues(path, GET_PROPERTIES);
        
        if (!isObjectPattern(__a))
            return;
        
        const __cPath = path.get('declarations.0.init.arguments.1');
        
        for (const nameProp of __cPath.get('elements')) {
            let used = false;
            
            if (!nameProp.isStringLiteral())
                break;
            
            const {value} = nameProp.node;
            
            for (const prop of __a.properties) {
                const propName = prop.value.name.replace(/Path$/, '');
                
                if (propName === value)
                    used = true;
            }
            
            if (!used)
                push({
                    path: nameProp,
                    name: value,
                });
        }
    },
});
