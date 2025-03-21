import {operator, types} from 'putout';

const {isObjectPattern} = types;
const {
    getTemplateValues,
    remove,
} = operator;

const GET_PROPERTIES = 'const __a = getProperties(__b, __c)';

export const report = ({name}) => `Remove unused property '${name}' from 'getProperties()' arguments`;

export const fix = ({path}) => {
    remove(path);
};

export const traverse = ({push}) => ({
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
