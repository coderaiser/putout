'use strict';

const {
    isIdentifier,
    isClassMethod,
    identifier,
    functionDeclaration,
} = require('putout').types;

module.exports = (chunk) => {
    const {node} = chunk;
    const {body} = node;
    
    const allBody = [];
    const funcs = [];
    let render;
    
    for (const item of body.body) {
        if (isIdentifier(item.key, {name: 'constructor'})) {
            chunk.traverse({
                Super(chunk) {
                    chunk.parentPath.remove();
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
        
        if (isClassMethod(item))
            funcs.push(createFunction(item.key, item.params, item.body));
    }
    
    chunk.replaceWith(render);
    
    for (const fn of funcs) {
        chunk.node.body.body.splice(-1, 0, fn);
    }
};

function createComponentFunction(name, body) {
    return functionDeclaration(name, [identifier('props')], body, false, false);
}

function createFunction(name, params, body) {
    return functionDeclaration(name, params, body, false, false);
}

