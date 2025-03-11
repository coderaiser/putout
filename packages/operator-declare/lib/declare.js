'use strict';

const {template} = require('@putout/engine-parser');
const {isESM, insertAfter} = require('@putout/operate');

const {compare} = require('@putout/compare');

const {types} = require('@putout/babel');

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

const getLastVarPath = (bodyPath) => bodyPath
    .filter(isVariableDeclaration)
    .pop();

const isLast = (insertionPath, bodyPath) => bodyPath.at(-1) === insertionPath;
const isLocalImport = (path) => path.node.source.value.includes('.');

const cutName = (a) => a
    .split('.')
    .shift();

const parseType = (path) => isESM(path) ? 'esm' : 'commonjs';

const TS_EXCLUDE = [
    'TSMethodSignature',
    'TSParameterProperty',
    'TSFunctionType',
    'TSDeclareMethod',
    'TSDeclareFunction',
    'TSTypeAliasDeclaration',
];

module.exports.declare = (declarations) => ({
    report,
    include,
    fix: fix(declarations),
    filter: filter(declarations),
});

const report = (path) => {
    const {name} = path.node;
    const peaceOfName = cutName(name);
    
    return `Declare '${peaceOfName}', it referenced but not defined`;
};

const include = () => [
    'ReferencedIdentifier',
];

const filter = (declarations) => (path, {options}) => {
    if (TS_EXCLUDE.includes(path.parentPath.type))
        return false;
    
    const {dismiss = [], type: typeOverride} = options;
    
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const names = keys(allDeclarations);
    const {scope, node} = path;
    const {name} = node;
    
    if (!names.includes(name))
        return false;
    
    if (dismiss.includes(name))
        return false;
    
    if (scope.hasBinding(name) || checkDeclarationForESLint(name, path))
        return false;
    
    const type = computeType(path, typeOverride);
    
    return parseCode(type, allDeclarations[name]);
};

const fix = (declarations) => (path, {options}) => {
    const type = getModuleType(path);
    
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
    
    insert(node, bodyPath);
    addDeclarationForESLint(name, path);
};

const parseCode = (type, current) => {
    if (isString(current))
        return current;
    
    return current[type];
};

function getInsertionPath(node, bodyPath) {
    const lastImportPath = getLastImportPath(bodyPath);
    const lastVarPath = getLastVarPath(bodyPath);
    
    if (isVariableDeclaration(node) && lastImportPath)
        return lastImportPath;
    
    if ((isImportDeclaration(node) || isRequire(node)) && lastImportPath)
        return lastImportPath;
    
    if (isVariableDeclaration(node) && lastVarPath && !isLast(lastVarPath, bodyPath))
        return lastVarPath;
    
    return null;
}

const isRequire = (node) => compare(node, 'const __a = require(__b)');

function insert(node, bodyPath) {
    const insertionPath = getInsertionPath(node, bodyPath);
    const [first] = bodyPath;
    
    if (isVariableDeclaration(node) && isImportDeclaration(insertionPath) || isRequire(insertionPath))
        return insertAfter(insertionPath, node);
    
    if (isVariableDeclaration(node)) {
        if (isRequire(first))
            return first.insertAfter(node);
        
        return first.insertBefore(node);
    }
    
    if (!insertionPath)
        return first.insertBefore(node);
    
    if (insertionPath.isImportDeclaration() && isLocalImport(insertionPath))
        return insertionPath.insertBefore(node);
    
    return insertAfter(insertionPath, node);
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

function computeType(path, type) {
    if (type)
        return setModuleType(type, path);
    
    const newType = getModuleType(path);
    
    if (newType)
        return newType;
    
    return setModuleType(parseType(path), path);
}
