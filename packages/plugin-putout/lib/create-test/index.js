'use strict';

const {operator, types} = require('putout');
const {
    arrayExpression,
    objectExpression,
    stringLiteral,
    identifier,
    isIdentifier,
    objectProperty,
} = types;

const {replaceWith, getProperty} = operator;

module.exports.report = () => `Apply modifications to 'createTest()' options`;

module.exports.include = () => [
    'createTest(__dirname, __object)',
    'createTest(import.meta.url, __object)',
];

module.exports.fix = (path, {options}) => {
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

module.exports.filter = (path, {options}) => {
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
