'use strict';

const {types, template} = require('putout');
const {traverse} = require('@putout/traverse');
const {
    addDeclarationForESLint,
    checkDeclarationForESLint,
    getModuleType,
    setModuleType,
} = require('./record');

const {
    isImportDeclaration,
    isVariableDeclaration,
} = types;

const {keys} = Object;
const isString = (a) => typeof a === 'string';

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

const filter = (declarations) => (path, {options}) => {
    const {dismiss = []} = options;
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const names = keys(allDeclarations);
    const {scope, node} = path;
    const {name} = node;
    
    if (scope.hasBinding(name) || checkDeclarationForESLint(name, path))
        return false;
    
    if (!names.includes(name))
        return false;
    
    if (dismiss.includes(name))
        return false;
    
    return true;
};

const fix = (declarations) => (path, {options}) => {
    const type = getModuleType(path) || setModuleType(parseType(path), path);
    
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const {name} = path.node;
    const code = parseCode(type, allDeclarations[name]);
    
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    const node = template.ast.fresh(code);
    
    for (const currentPath of bodyPath) {
        if (isUseStrict(currentPath)) {
            continue;
        }
        
        if (isImportDeclaration(node)) {
            currentPath.insertBefore(node);
            break;
        }
        
        if (currentPath.isVariableDeclaration() && bodyPath.length !== bodyPath.filter(isVariableDeclaration).length) {
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

const parseCode = (type, current) => {
    if (isString(current))
        return current;
    
    return current[type];
};

const parseType = (path) => {
    let isESM = false;
    
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    
    traverse(programPath, {
        'ImportDeclaration|ExportDeclaration'(path) {
            isESM = true;
            path.stop();
        },
    });
    
    return isESM ? 'esm' : 'commonjs';
};
