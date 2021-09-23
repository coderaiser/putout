'use strict';

const {types} = require('putout');
const {
    addDeclarationForESLint,
    checkDeclarationForESLint,
} = require('./record');

const {isImportDeclaration} = types;
const {keys} = Object;

const crawl = (path) => path.scope.getProgramParent().path.scope.crawl();
const cutName = (a) => a.split('.').shift();

module.exports = (declarations) => ({
    report,
    include,
    fix: fix(declarations),
    filter: filter(declarations),
});

const report = (path) => {
    const {name} = path.node;
    const cutedName = cutName(name);
    
    return `Declare '${cutedName}'`;
};

const include = () => ['ReferencedIdentifier'];

const filter = (declarations) => {
    const names = keys(declarations);
    
    return (path, {options}) => {
        const {dismiss = []} = options;
        const {scope, node} = path;
        const {name} = node;
        
        if (checkDeclarationForESLint(name, path))
            return false;
        
        if (scope.hasBinding(name))
            return false;
        
        if (!names.includes(name))
            return false;
        
        if (dismiss.includes(name))
            return false;
        
        return true;
    };
};

const fix = (declarations) => (path) => {
    const {name} = path.node;
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    const node = declarations[name]();
    
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
    
    crawl(path);
    addDeclarationForESLint(name, path);
};

function isUseStrict(path) {
    if (!path.isExpressionStatement())
        return false;
    
    const expressionPath = path.get('expression');
    
    return expressionPath.isStringLiteral({
        value: 'use strict',
    });
}

