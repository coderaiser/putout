'use strict';

const {types, template} = require('putout');
const {isESM} = require('@putout/operate');
const {compare} = require('@putout/compare');

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

const getLastVarPath = (bodyPath) => bodyPath.filter(isVariableDeclaration).pop();
const isLast = (insertionPath, bodyPath) => bodyPath[bodyPath.length - 1] === insertionPath;
const isLocalImport = (path) => path.node.source.value.includes('.');

const cutName = (a) => a.split('.').shift();
const parseType = (path) => isESM(path) ? 'esm' : 'commonjs';

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
    
    const type = getModuleType(path) || setModuleType(parseType(path), path);
    
    if (scope.hasBinding(name) || checkDeclarationForESLint(name, path))
        return false;
    
    if (!names.includes(name))
        return false;
    
    if (dismiss.includes(name))
        return false;
    
    const code = parseCode(name, type, allDeclarations[name]);
    
    if (!code)
        return false;
    
    return true;
};

const fix = (declarations) => (path, {options}) => {
    const type = setModuleType(parseType(path), path);
    
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const {name} = path.node;
    const code = parseCode(name, type, allDeclarations[name]);
    
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    const node = template.ast.fresh(code);
    
    insert(node, bodyPath);
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

const parseCode = (name, type, current) => {
    if (isString(current))
        return current;
    
    const result = current[type];
    
    return result;
};

function getInsertionPath(node, bodyPath) {
    const lastImportPath = getLastImportPath(bodyPath);
    const lastVarPath = getLastVarPath(bodyPath);
    
    if ((isImportDeclaration(node) || isRequire(node)) && lastImportPath)
        return lastImportPath;
    
    if (isVariableDeclaration(node) && lastVarPath && !isLast(lastVarPath, bodyPath))
        return lastVarPath;
    
    if (isVariableDeclaration(node) && lastImportPath)
        return lastImportPath;
    
    return null;
}

const isRequire = (node) => compare(node, 'const __a = require(__b)');

function insert(node, bodyPath) {
    const insertionPath = getInsertionPath(node, bodyPath);
    const [first] = bodyPath;
    
    if (isRequire(node))
        return first.insertBefore(node);
    
    if (!insertionPath && isUseStrict(first))
        return first.insertAfter(node);
    
    if (!insertionPath && !isUseStrict(first))
        return first.insertBefore(node);
    
    if (insertionPath.isImportDeclaration() && isLocalImport(insertionPath))
        return insertionPath.insertBefore(node);
    
    return insertionPath.insertAfter(node);
}

const getLastImportPath = (bodyPath) => {
    const imports = [];
    const localImports = [];
    
    for (const path of bodyPath) {
        if (!path.isImportDeclaration())
            continue;
        
        if (isLocalImport(path)) {
            localImports.push(path);
            continue;
        }
        
        imports.push(path);
    }
    
    return imports.pop() || localImports.pop();
};
