'use strict';

const {
    operator,
    types,
} = require('putout');

const {
    StringLiteral,
    ArrayExpression,
    Identifier,
    ObjectProperty,
    ObjectExpression,
} = types;

const {
    replaceWith,
    getProperty,
} = operator;

const selector = 'createTest(__dirname, __object)';

module.exports.report = () => `Apply modifications to 'createTest()' options`;

module.exports.include = () => [
    selector,
];

module.exports.fix = (path, {options}) => {
    const objectPath = path.get('arguments.1');
    
    if (!getProperty(objectPath, 'plugins'))
        convert(objectPath);
    
    for (const [name, value] of options.add) {
        if (getProperty(objectPath, name))
            continue;
        
        const property = ObjectProperty(Identifier(name), StringLiteral(value));
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

function convert(objectPath) {
    const {
        key,
        value,
    } = objectPath.node.properties[0];
    
    replaceWith(objectPath, ObjectExpression([
        ObjectProperty(Identifier('plugins'), ArrayExpression([
            ArrayExpression([
                key,
                value,
            ]),
        ])),
    ]));
}
