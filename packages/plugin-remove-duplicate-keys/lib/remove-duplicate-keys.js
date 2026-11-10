import {types, operator} from 'putout';

const {
    compare,
    extract,
    createTypeChecker,
} = operator;

const {isObjectPattern} = types;

const isSpreadId = createTypeChecker([
    '-: -> !SpreadElement',
    '-: argument -> !Identifier',
    '+: -> SpreadElement',
]);

const isIdentifierKey = createTypeChecker([
    '-: -> !ObjectProperty',
    '+: key -> Identifier',
]);

const isStringKey = createTypeChecker([
    '-: -> !ObjectProperty',
    '+: key -> StringLiteral',
]);

const isMemberKey = createTypeChecker([
    '-: -> !ObjectProperty',
    '-: key -> !MemberExpression',
    '-: key.object -> CallExpression',
    '+: -> ObjectProperty',
]);

const getId = (property) => {
    if (isSpreadId(property))
        return `...${property.argument.name}`;
    
    if (isIdentifierKey(property))
        return property.computed ? `[${property.key.name}]` : property.key.name;
    
    if (isStringKey(property))
        return `'${property.key.value}'`;
    
    if (isMemberKey(property))
        return `[${extract(property.key)}]`;
    
    return '';
};

const getName = (property) => {
    if (isSpreadId(property))
        return property.argument.name;
    
    return extract(property.key);
};

const addQuotes = (a) => `'${a}'`;

export const report = ({names}) => {
    const quotedNames = names
        .map(addQuotes)
        .join(', ');
    
    return `Avoid duplicate keys: ${quotedNames}`;
};

export const fix = ({path, newProperties}) => {
    path.node.properties = newProperties;
};

export const traverse = ({push}) => ({
    __object: (path) => {
        const newProperties = [];
        const names = [];
        const ids = new Set();
        const {properties} = path.node;
        
        for (const prop of properties.toReversed()) {
            if (isObjectPattern(path) && !compare(prop.key, prop.value))
                continue;
            
            const id = getId(prop);
            
            if (ids.has(id)) {
                names.unshift(getName(prop));
                continue;
            }
            
            if (id)
                ids.add(id);
            
            newProperties.unshift(prop);
        }
        
        if (names.length)
            push({
                path,
                names,
                newProperties,
            });
    },
});
