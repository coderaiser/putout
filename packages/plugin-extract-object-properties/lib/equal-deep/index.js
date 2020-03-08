'use strict';

const {
    template,
    generate,
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;
const {isIdentifier} = types;

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
        MemberExpression(path) {
            if (!path.parentPath.isVariableDeclarator())
                return;
            
            if (path.node.property.name === 'default')
                return;
            
            if (!path.parentPath.get('id').isObjectPattern())
                return;
            
            const objectPath = path.get('object');
            const object = objectPath.node;
            
            if (objectPath.isIdentifier())
                return add({
                    name: generate(object).code,
                    items,
                    path,
                });
            
            if (objectPath.isCallExpression())
                return add({
                    name: generate(objectPath.node).code,
                    items,
                    path,
                });
        },
    });
    
    const processed = process(Object.values(items));
    
    return filter(processed);
};

function getName(path) {
    if (path.isMemberExpression())
        return path.node.property.name;
}

function filter(all) {
    const result = [];
    
    for (const {name, path, items} of all) {
        let isBind = false;
        
        for (const item of items) {
            const name = getName(item);
            
            isBind = item.scope.bindings[name];
            
            if (isBind)
                break;
        }
        
        if (!isBind)
            result.push({
                name,
                path,
                items,
            });
    }
    
    return result;
}

function process(items) {
    const result = [];
    
    for (const item of items) {
        const names = Object.keys(item);
        
        for (const name of names) {
            if (item[name].length < 2)
                continue;
            
            const path = item[name][item[name].length - 1];
            
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

