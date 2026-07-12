import {template} from '@putout/engine-parser';
import {isESM, insertAfter} from '@putout/operate';
import {compare} from '@putout/compare';
import {types} from '@putout/babel';
import {
    addDeclarationForESLint,
    checkDeclarationForESLint,
    getModuleType,
    setModuleType,
} from './record.js';

const {
    isImportDeclaration,
    isVariableDeclaration,
    isFunction,
    isTSParameterProperty,
} = types;

const {keys} = Object;
const {isArray} = Array;
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
    'TSFunctionType',
    'TSDeclareMethod',
    'TSDeclareFunction',
    'TSParameterProperty',
    'TSTypeAliasDeclaration',
    'TSQualifiedName',
];

export const declare = (declarations) => ({
    report,
    fix: fix(declarations),
    traverse: createTraverse(declarations),
});

const report = (path) => {
    const {name} = path.node;
    const peaceOfName = cutName(name);
    
    return `Declare '${peaceOfName}', it referenced but not defined`;
};

const createTraverse = (declarations) => ({push, options}) => ({
    ReferencedIdentifier: function traverseAgain(path) {
        const {
            parentPath,
            scope,
            node,
        } = path;
        
        if (isTSParameterProperty(parentPath) && parentPath.node.decorators) {
            const decorators = parentPath.get('decorators');
            
            for (const decorator of decorators) {
                const expression = decorator.get('expression');
                
                if (compare(expression, '__a(__b)'))
                    traverseAgain(expression.get('callee'));
            }
            
            return;
        }
        
        if (TS_EXCLUDE.includes(parentPath.type))
            return false;
        
        const {dismiss = [], type: typeOverride} = options;
        
        const allDeclarations = {
            ...declarations,
            ...options.declarations,
        };
        
        const names = keys(allDeclarations);
        
        const {name} = node;
        
        if (!names.includes(name))
            return false;
        
        if (dismiss.includes(name))
            return false;
        
        if (scope.hasBinding(name) || checkDeclarationForESLint(name, path))
            return false;
        
        const type = computeType(path, typeOverride);
        
        if (parseCode(type, allDeclarations[name]))
            push(path);
    },
});

const fix = (declarations) => (path, {options}) => {
    const type = getModuleType(path);
    
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const {name} = path.node;
    const current = allDeclarations[name];
    const code = parseCode(type, current);
    const bodyPath = getBodyPath(path, current);
    const node = template.ast.fresh(code);
    
    insert(node, bodyPath);
    addDeclarationForESLint(name, path);
};

const getBodyPath = (path, current) => {
    if (isArray(current) && current[1].nearby) {
        const fnPath = path.find(isFunction);
        
        if (fnPath)
            return fnPath.get('body.body');
    }
    
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    
    return programPath.get('body');
};

const parseCode = (type, current) => {
    if (isString(current))
        return current;
    
    if (isArray(current))
        return current[0];
    
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
