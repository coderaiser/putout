'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = ({name}) => `Avoid unused private field "#${name}"`;

module.exports.fix = ({path}) => {
    remove(path);
};

module.exports.traverse = ({push}) => {
    const vars = [];
    const addVar = addVariable(vars);
    const rmVar = removeVariable(vars);
    const list = [];
    
    return {
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
        Program: {
            exit() {
                for (const [path, name] of list) {
                    rmVar(path, name);
                }
                
                for (const {name, path} of Object.values(vars)) {
                    if (!path.node)
                        continue;
                    
                    push({
                        name,
                        path,
                    });
                }
            },
        },
    };
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
