'use strict';

const {types, operator} = require('putout');

const {replaceWith, remove} = operator;

const {
    isIdentifier,
    identifier,
    functionDeclaration,
} = types;

module.exports = (path) => {
    const {node} = path;
    const {body} = node;
    
    const allBody = [];
    const funcs = [];
    let render;
    
    for (const item of body.body) {
        if (isIdentifier(item.key, {name: 'constructor'})) {
            path.traverse({
                Super(path) {
                    remove(path.parentPath);
                },
            });
            
            allBody.push(...item.body.body);
            continue;
        }
        
        if (isIdentifier(item.key, {name: 'render'})) {
            item.body.body.unshift(...allBody);
            
            render = createComponentFunction(node.id, item.body);
            continue;
        }
        
        funcs.push(createFunction(item.key, item.params, item.body));
    }
    
    replaceWith(path, render);
    
    for (const fn of funcs) {
        path.node.body.body.splice(-1, 0, fn);
    }
};

function createComponentFunction(name, body) {
    return functionDeclaration(name, [identifier('props')], body, false, false);
}

function createFunction(name, params, body) {
    return functionDeclaration(name, params, body, false, false);
}
