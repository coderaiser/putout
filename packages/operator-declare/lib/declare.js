'use strict';

const {types, template} = require('putout');
const {
    addDeclarationForESLint,
    checkDeclarationForESLint,
} = require('./record');

const {isImportDeclaration} = types;
const {keys} = Object;

const crawl = (path) => path.scope.getProgramParent().path.scope.crawl();
const cutName = (a) => a.split('.').shift();

module.exports.declare = (declarations) => ({
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
        const {dismiss = [], declarations = []} = options;
        const optionNames = keys(declarations);
        const {scope, node} = path;
        const {name} = node;
        
        if (checkDeclarationForESLint(name, path))
            return false;
        
        if (scope.hasBinding(name))
            return false;
        
        if (!names.includes(name) && !optionNames.includes(name))
            return false;
        
        if (dismiss.includes(name))
            return false;
        
        return true;
    };
};

const fix = (declarations) => (path, {options}) => {
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const {name} = path.node;
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    const node = template.ast.fresh(allDeclarations[name]);
    
    for (const currentPath of bodyPath) {
        if (isUseStrict(currentPath)) {
            continue;
        }
        
        if (isImportDeclaration(node)) {
            currentPath.insertBefore(node);
            break;
        }
        
        if (currentPath.isVariableDeclaration() && bodyPath.length > 1) {
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

