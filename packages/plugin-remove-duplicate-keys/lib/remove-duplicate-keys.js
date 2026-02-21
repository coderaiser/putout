import {types, operator} from 'putout';

const {
    compare,
    traverseProperties,
    extract,
} = operator;

const {
    isSpreadElement,
    isIdentifier,
    isMemberExpression,
    isObjectProperty,
    isStringLiteral,
    isObjectPattern,
    isCallExpression,
} = types;

const isSpreadId = (name) => (a) => isSpreadElement(a) && isIdentifier(a.argument, {
    name,
});

const isObjectPropertyLiteral = (value) => (a) => isObjectProperty(a) && isStringLiteral(a.key, {
    value,
});

const addQuote = (a) => `'${a}'`;

export const report = ({names}) => {
    const {length} = names;
    const quotedNames = names
        .map(addQuote)
        .join(', ');
    
    const suffix = !length ? '' : `: ${quotedNames}`;
    
    return `Avoid duplicate keys${suffix}`;
};

export const fix = ({path, newProperties}) => {
    path.node.properties = newProperties;
};

export const traverse = ({push}) => ({
    __object: (path) => {
        let is = false;
        const newProperties = [];
        const {properties} = path.node;
        
        const reversed = properties
            .slice()
            .reverse();
        
        const names = [];
        
        for (const prop of reversed) {
            if (isObjectPattern(path) && !compare(prop.key, prop.value))
                continue;
            
            if (isSpreadElement(prop) && isIdentifier(prop.argument)) {
                const {name} = prop.argument;
                const isFirst = checkIfFirst(properties, newProperties, isSpreadId, name);
                
                if (!isFirst) {
                    is = true;
                    names.unshift(name);
                    continue;
                }
            }
            
            if (isObjectProperty(prop) && isIdentifier(prop.key)) {
                const {computed} = prop;
                const {name} = prop.key;
                
                const props = traverseProperties(path, name, {
                    firstLevel: true,
                });
                
                if (props.length > 1) {
                    const isFirst = checkIfFirst(properties, newProperties, isObjectPropertyId, name, {
                        computed,
                    });
                    
                    if (!isFirst) {
                        is = true;
                        names.unshift(name);
                        continue;
                    }
                }
            }
            
            if (isObjectProperty(prop) && isStringLiteral(prop.key)) {
                const {value} = prop.key;
                const isFirst = checkIfFirst(properties, newProperties, isObjectPropertyLiteral, value);
                
                if (!isFirst) {
                    is = true;
                    names.unshift(value);
                    continue;
                }
            }
            
            if (isObjectProperty(prop) && isMemberExpression(prop.key)) {
                if (isCallExpression(prop.key.object))
                    continue;
                
                const {computed} = prop;
                const name = extract(prop.key);
                
                const props = traverseProperties(path, name, {
                    firstLevel: true,
                });
                
                if (props.length > 1) {
                    const isFirst = checkIfFirst(properties, newProperties, isMemberExpressionId, name, {
                        computed,
                    });
                    
                    if (!isFirst) {
                        is = true;
                        continue;
                    }
                }
            }
            
            newProperties.unshift(prop);
        }
        
        if (is)
            push({
                path,
                names,
                newProperties,
            });
    },
});

function checkIfFirst(properties, newProperties, isFn, str, {computed} = {}) {
    const oldLength = properties.filter(isFn(str, computed)).length;
    const newLength = newProperties.filter(isFn(str, computed)).length;
    
    return !newLength || oldLength <= 1;
}

const isObjectPropertyId = (name, computed) => (a) => {
    if (!isObjectProperty(a, {computed}))
        return false;
    
    return isIdentifier(a.key, {
        name,
    });
};

const isMemberExpressionId = (name, computed) => (a) => {
    if (!isObjectProperty(a, {computed}))
        return false;
    
    return name === extract(a.key);
};
