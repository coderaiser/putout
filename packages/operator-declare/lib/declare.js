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

const {keys, entries} = Object;
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
    const type = getModuleType(path) || setModuleType(parseType(path), path);
    
    const {dismiss = []} = options;
    const allDeclarations = parseDeclarations(type, {
        ...declarations,
        ...options.declarations,
    });
    
    const names = keys(allDeclarations);
    
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

const fix = (declarations) => (path, {options}) => {
    const type = getModuleType(path);
    const allDeclarations = parseDeclarations(type, {
        ...declarations,
        ...options.declarations,
    });
    
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

const chooseType = (type, current) => {
    if (isString(current))
        return current;
    
    return current[type];
};

function parseDeclarations(type, declarations) {
    const resultDeclarations = {};
    
    for (const [name, option] of entries(declarations)) {
        resultDeclarations[name] = chooseType(type, option);
    }
    
    return resultDeclarations;
}

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
