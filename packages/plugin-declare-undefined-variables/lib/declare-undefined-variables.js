'use strict';

const {types} = require('putout');
const declarations = require('./declarations');
const {
    addDeclaration,
    checkDeclaration,
} = require('./record');

const {isImportDeclaration} = types;

const {entries} = Object;

const crawl = (path) => path.scope.getProgramParent().path.scope.crawl();
const cutName = (a) => a.split('.').shift();

module.exports.report = (path) => {
    const name = path.get('callee').toString();
    const cutedName = cutName(name);
    
    return `'${cutedName}' should be declared`;
};

module.exports.match = ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name] of entries(declarations)) {
        if (dismiss.includes(name))
            continue;
        
        traverseObject[`${name}(__args)`] = isUndefined(name);
    }
    
    return traverseObject;
};

module.exports.replace = ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name, node] of entries(declarations)) {
        if (dismiss.includes(name))
            continue;
        
        traverseObject[`${name}(__args)`] = declare(name, node);
    }
    
    return traverseObject;
};

const isUndefined = (name) => (vars, path) => {
    const {scope} = path;
    const cutedName = cutName(name);
    
    if (checkDeclaration(name, path))
        return false;
    
    return !scope.hasBinding(cutedName);
};

const declare = (name, node) => (vars, path) => {
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    
    for (const currentPath of bodyPath) {
        if (isUseStrict(currentPath)) {
            continue;
        }
        
        if (isImportDeclaration(node)) {
            currentPath.insertBefore(node);
            break;
        }
        
        if (currentPath.isVariableDeclaration()) {
            continue;
        }
        
        if (currentPath.isImportDeclaration()) {
            continue;
        }
        
        currentPath.insertBefore(node);
        break;
    }
    
    addDeclaration(name, path);
    
    crawl(path);
    return path;
};

function isUseStrict(path) {
    if (!path.isExpressionStatement())
        return false;
    
    const expressionPath = path.get('expression');
    
    return expressionPath.isStringLiteral({
        value: 'use strict',
    });
}

