import {operator, types} from 'putout';

const {
    arrayExpression,
    objectExpression,
    stringLiteral,
    identifier,
    isIdentifier,
    objectProperty,
} = types;

const {replaceWith, getProperty} = operator;

export const report = () => `Apply modifications to 'createTest()' options`;

export const include = () => [
    'createTest(__dirname, __object)',
    'createTest(import.meta.url, __object)',
];

export const fix = (path, {options}) => {
    const objectPath = path.get('arguments.1');
    
    if (!getProperty(objectPath, 'plugins'))
        convert(objectPath);
    
    for (const [name, value] of options.add) {
        if (getProperty(objectPath, name))
            continue;
        
        const property = objectProperty(identifier(name), stringLiteral(value));
        objectPath.node.properties.unshift(property);
    }
};

export const filter = (path, {options}) => {
    if (!options.add)
        return false;
    
    const objectPath = path.get('arguments.1');
    
    for (const [name] of options.add) {
        if (!getProperty(objectPath, name))
            return true;
    }
    
    return false;
};

const maybeLiteral = (a) => {
    if (isIdentifier(a))
        return stringLiteral(a.name);
    
    return a;
};

function convert(objectPath) {
    const {key, value} = objectPath.node.properties[0];
    
    replaceWith(objectPath, objectExpression([
        objectProperty(identifier('plugins'), arrayExpression([
            arrayExpression([
                maybeLiteral(key),
                value,
            ]),
        ])),
    ]));
}
