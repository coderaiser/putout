'use strict';

const {traverse} = require('putout');

module.exports.report = ({name}) => `private field "#${name}" declared by not used`;

module.exports.find = (ast) => {
    const vars = [];
    const addVar = addVariable(vars);
    const rmVar = removeVariable(vars);
    
    traverseClass(ast, {
        ClassPrivateProperty(chunk) {
            const keyPath = chunk.key;
            addVar(chunk, keyPath.node.id.name);
        },
        
        ClassPrivateMethod(chunk) {
            const keyPath = chunk.key;
            addVar(chunk, keyPath.node.id.name);
        },
        
        ThisExpression(chunk) {
            debugger;
            const {parentPath} = chunk;
            const propertyPath = parentPath.property;
            
            if (!propertyPath.isPrivateName())
                return;
            
            rmVar(chunk, propertyPath.node.id.name);
        },
    });
    
    return Object.values(vars);
};

module.exports.fix = ({chunk}) => {
    chunk.remove();
};

function findClassName(chunk) {
    while (!chunk.isClassDeclaration()) {
        chunk = chunk.parentPath;
    }
    
    return chunk.node.id.name;
}

const addVariable = (vars) => (chunk, name) => {
    const {uid} = findClassName(chunk);
    const id = `${uid}-${name}`;
    
    if (!vars[id])
        vars[id] = {};
    
    vars[id] = {
        chunk,
        name,
    };
};

const removeVariable = (vars) => (chunk, name) => {
    const {uid} = findClassName(chunk);
    const id = `${uid}-${name}`;
    
    delete vars[id];
};

function traverseClass(ast, visitor) {
    traverse(ast, {
        ClassDeclaration(chunk) {
            chunk.traverse(visitor);
        },
    });
}

