'use strict';

const {
    template,
    generate,
    types,
    operator,
} = require('putout');

const {
    findBinding,
    replaceWith,
    getTemplateValues,
} = operator;

const {
    isIdentifier,
    isCallExpression,
} = types;

const {keys} = Object;

module.exports.report = () => `Object properties should be extracted into variables`;

const buildAst = template(`
    const {PROPERTY} = OBJECT;
`);

module.exports.fix = ({items}) => {
    const names = [];
    
    for (const item of items) {
        const {object, property} = item.node;
        
        if (isIdentifier(property) && !names.includes(property.name)) {
            names.push(property.name);
            
            const {
                body = item.scope.block.body,
            } = item.scope.block.body;
            
            body.unshift(buildAst({
                PROPERTY: property,
                OBJECT: object,
            }));
        }
        
        replaceWith(item, item.node.property);
    }
};

module.exports.find = (ast, {traverse}) => {
    const items = [];
    
    traverse(ast, {
        'const __object = __a.__b'(fullPath) {
            const {__a, __b} = getTemplateValues(fullPath, 'const __object = __a.__b');
            const path = fullPath.get('declarations.0.init');
            
            if (findBinding(fullPath, __b.name))
                return;
            
            if (isIdentifier(__a))
                return add({
                    name: generate(__a).code,
                    items,
                    path,
                });
            
            if (isCallExpression(__a))
                return add({
                    name: generate(__a).code,
                    items,
                    path,
                });
        },
    });
    
    const processed = process(Object.values(items));
    
    return processed;
};

function process(items) {
    const result = [];
    
    for (const item of items) {
        for (const name of keys(item)) {
            if (item[name].length < 2)
                continue;
            
            const index = item[name].length - 1;
            const path = item[name][index];
            
            result.push({
                name,
                path,
                items: item[name],
            });
        }
    }
    
    return result;
}

function add({name, path, items}) {
    const {uid} = path.scope;
    
    if (!items[uid])
        items[uid] = {};
    
    if (!items[uid][name])
        items[uid][name] = [];
    
    items[uid][name].push(path);
}

