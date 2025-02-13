'use strict';

const {traverse, operator} = require('putout');

const {remove} = operator;

module.exports.report = ({name}) => `Private field "#${name}" declared by not used`;

module.exports.find = (ast) => {
    const vars = [];
    const addVar = addVariable(vars);
    const rmVar = removeVariable(vars);
    const list = [];
    
    traverseClass(ast, {
        ClassPrivateProperty(path) {
            const keyPath = path.get('key');
            addVar(path, keyPath.node.id.name);
        },
        
        ClassPrivateMethod(path) {
            const keyPath = path.get('key');
            addVar(path, keyPath.node.id.name);
        },
        
        ThisExpression(path) {
            const {parentPath} = path;
            const propertyPath = parentPath.get('property');
            
            if (propertyPath.isPrivateName()) {
                list.push([path, propertyPath.node.id.name]);
                return;
            }
            
            if (!parentPath.isVariableDeclarator())
                return;
            
            const idPath = parentPath.get('id');
            
            if (!idPath.isObjectPattern())
                return;
            
            for (const propertyPath of idPath.get('properties')) {
                const keyPath = propertyPath.get('key');
                
                if (keyPath.isPrivateName())
                    list.push([path, keyPath.node.id.name]);
            }
        },
    });
    
    for (const [path, name] of list) {
        rmVar(path, name);
    }
    
    return Object.values(vars);
};

module.exports.fix = ({path}) => {
    remove(path);
};

function findClassName(path) {
    while (!path.isClass()) {
        path = path.parentPath;
    }
    
    return path.scope;
}

const addVariable = (vars) => (path, name) => {
    const {uid} = findClassName(path);
    const id = `${uid}-${name}`;
    
    vars[id] = vars[id] || {
        path,
        name,
    };
};

const removeVariable = (vars) => (path, name) => {
    const {uid} = findClassName(path);
    const id = `${uid}-${name}`;
    
    delete vars[id];
};

function traverseClass(ast, visitor) {
    traverse(ast, {
        'ClassDeclaration|ClassExpression'(path) {
            path.traverse(visitor);
        },
    });
}
