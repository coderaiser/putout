'use strict';

const {template} = require('@putout/engine-parser');
const {types} = require('@putout/babel');
const {
    isBlockStatement,
    isBooleanLiteral,
    isIdentifier,
    isLiteral,
    isTemplateElement,
    isFunction,
    isImportDefaultSpecifier,
    isExportSpecifier,
    isRegExpLiteral,
    isJSXText,
    isJSXIdentifier,
    isJSXAttribute,
    isTSTypeReference,
    isTSTypeParameterDeclaration,
} = types;

const isStr = (a) => typeof a === 'string';

const ANY_OBJECT = '__object';
const ANY_ARRAY = '__array';
const ARGS = '__args';
const TYPE_PARAMS = '__type_params';
const IMPORTS = '__imports';
const EXPORTS = '__exports';
const BODY = '__body';
const JSX_CHILDREN = '__jsx_children';
const JSX_ATTRIBUTES = '__jsx_attributes';
const NOP = '__nop';
const ANY = '__';
const ID = '__identifier';
const BOOL = '__bool';

const LINKED_NODE = /^__[a-z]$/;
const LINKED_ARGS = /__args__[a-z]$/;
const LINKED_ID = /^__identifier__[a-z]$/;
const LINKED_BOOL = /^__bool__[a-z]$/;

const ALL = [
    ANY_OBJECT,
    ANY_ARRAY,
    ARGS,
    TYPE_PARAMS,
    BOOL,
    JSX_CHILDREN,
    JSX_ATTRIBUTES,
    IMPORTS,
    EXPORTS,
    BODY,
    ANY,
    ID,
    LINKED_NODE,
    LINKED_ARGS,
    LINKED_ID,
    LINKED_BOOL,
];

module.exports.isTemplate = (a) => /[(;={.\s]/.test(a) || !/^[A-Z]/.test(a);

module.exports.is = (str, array = ALL) => {
    for (const item of array) {
        if (check(str, item))
            return true;
    }
    
    return false;
};

function check(str, item) {
    if (isStr(item))
        return str === item;
    
    return item.test(str);
}

module.exports.isNameStr = (a) => LINKED_NODE.test(a);
module.exports.isImportsStr = (a) => a === IMPORTS;
module.exports.isExportsStr = (a) => a === EXPORTS;
module.exports.isArgsStr = (a) => a === ARGS || LINKED_ARGS.test(a);
module.exports.isTypeParamsStr = (a) => a === TYPE_PARAMS;
module.exports.isJSXChildrenStr = (a) => a === JSX_CHILDREN;
module.exports.isJSXAttributesStr = (a) => a === JSX_ATTRIBUTES;
module.exports.isObjectStr = (a) => a === ANY_OBJECT;
module.exports.isArrayStr = (a) => a === ANY_ARRAY;
module.exports.isAnyStr = (a) => a === ANY;
module.exports.isBodyStr = (a) => a === BODY;

const isBody = (a) => isIdentifier(a, {
    name: BODY,
});

const isFunctionDeclarationBody = (a) => {
    if (isBody(a))
        return true;
    
    return isBlockStatement(a) && isBody(a.body[0].expression);
};

const isNop = (a) => isIdentifier(a, {
    name: NOP,
});

const isAnyObject = (a) => isIdentifier(a, {
    name: ANY_OBJECT,
});

const isAnyArray = (a) => isIdentifier(a, {
    name: ANY_ARRAY,
});

const isId = (a, b) => {
    if (!isIdentifier(b, {name: ID}))
        return false;
    
    return isIdentifier(a);
};

const isBool = (a, b) => {
    if (!isIdentifier(b, {name: BOOL}))
        return false;
    
    return isBooleanLiteral(a);
};

const isEqualType = (a, b) => a.type === b.type;
const {isArray} = Array;

module.exports.isId = isId;
module.exports.isBool = isBool;
module.exports.isEqualType = isEqualType;
module.exports.isStr = (a) => typeof a === 'string';
module.exports.isAny = (a) => {
    if (isIdentifier(a, {name: ANY}))
        return true;
    
    return isJSXText(a, {
        value: ANY,
    });
};

module.exports.isAnyLiteral = (a, b) => {
    if (!isLiteral(b, {value: ANY}))
        return false;
    
    return isEqualType(a, b);
};

module.exports.isArgs = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    return isIdentifier(b, {
        name: ARGS,
    });
};

const isTypeParams = (node) => {
    if (!isTSTypeParameterDeclaration(node))
        return false;
    
    const {params} = node;
    const {name} = params[0];
    
    return isIdentifier(name, {
        name: TYPE_PARAMS,
    });
};

module.exports.isEqualTypeParams = (a, b) => {
    if (!a)
        return false;
    
    if (!isTypeParams(b))
        return false;
    
    return isEqualType(a, b);
};

module.exports.isLinkedArgs = (a) => {
    const b = !isArray(a) ? a : a[0];
    return isIdentifier(b) && LINKED_ARGS.test(b.name);
};

module.exports.isJSXChildren = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    return isJSXText(b, {
        value: JSX_CHILDREN,
    });
};

module.exports.isJSXAttributes = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    if (!isJSXAttribute(b))
        return false;
    
    return isJSXIdentifier(b.name, {
        name: JSX_ATTRIBUTES,
    });
};

module.exports.isLinkedId = (a, b) => {
    if (!isIdentifier(b) || !LINKED_ID.test(b.name))
        return false;
    
    return isIdentifier(a);
};

module.exports.isLinkedBool = (a, b) => {
    if (!isIdentifier(b) || !LINKED_BOOL.test(b.name))
        return false;
    
    return isBooleanLiteral(a);
};

module.exports.isLinkedRegExp = (a, b) => {
    if (!isRegExpLiteral(b) || !LINKED_NODE.test(b.pattern))
        return false;
    
    return isRegExpLiteral(a);
};

module.exports.isPath = (path) => Boolean(path.node);
module.exports.isArray = isArray;

module.exports.isObject = (a) => {
    if (!a)
        return false;
    
    if (isArray(a))
        return false;
    
    return typeof a === 'object';
};

module.exports.isArrays = (a, b) => {
    if (!isArray(a) || !isArray(b))
        return false;
    
    return a.length === b.length;
};

module.exports.isImports = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    if (!isImportDefaultSpecifier(b))
        return false;
    
    return isIdentifier(b.local, {
        name: IMPORTS,
    });
};

module.exports.isExports = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    if (!isExportSpecifier(b))
        return false;
    
    return isIdentifier(b.local, {
        name: EXPORTS,
    });
};

const __OBJECT_TYPE = 'ObjectPattern|ObjectExpression';
const __ARRAY_TYPE = 'ArrayPattern|ArrayExpression';

module.exports.isEqualAnyArray = (node, templateNode) => {
    if (!isAnyArray(templateNode))
        return false;
    
    const {type} = node;
    
    return __ARRAY_TYPE.includes(type);
};

module.exports.isEqualAnyObject = (node, templateNode) => {
    if (!isAnyObject(templateNode))
        return false;
    
    const {type} = node;
    
    return __OBJECT_TYPE.includes(type);
};

module.exports.isEqualBody = (node, templateNode) => {
    if (!node)
        return false;
    
    if (!isBody(templateNode))
        return false;
    
    return node.type === 'BlockStatement';
};

module.exports.isEqualFunctionDeclarationBody = (node, templateNode) => {
    if (!node)
        return false;
    
    if (!isFunctionDeclarationBody(templateNode))
        return false;
    
    return node.type === 'BlockStatement';
};

module.exports.isEqualNop = (node, templateNode) => {
    if (!isNop(templateNode))
        return false;
    
    if (!isFunction(node))
        return false;
    
    const {body} = node;
    
    if (!isBlockStatement(body))
        return false;
    
    return !body.body.length;
};

module.exports.isLinkedNode = (a) => {
    if (isIdentifier(a) && LINKED_NODE.test(a.name))
        return true;
    
    if (isLiteral(a) && LINKED_NODE.test(a.value))
        return true;
    
    if (isJSXText(a) && LINKED_NODE.test(a.value))
        return true;
    
    if (isJSXIdentifier(a) && LINKED_NODE.test(a.name))
        return true;
    
    if (isTemplateElement(a) && LINKED_NODE.test(a.value.raw))
        return true;
    
    return isTSTypeReference(a) && LINKED_NODE.test(a.typeName.name);
};

module.exports.parseTemplate = (tmpl, {program} = {}) => {
    const parse = !program ? template.ast : template.program.ast;
    const node = parse(tmpl) || template.ast.fresh(tmpl);
    
    if (tmpl === ANY_OBJECT)
        return [node, __OBJECT_TYPE];
    
    if (tmpl === ANY_ARRAY)
        return [node, __ARRAY_TYPE];
    
    const {type} = node;
    
    return [node, type];
};

module.exports.isInsideTypeReference = (path) => path.isIdentifier() && path.parentPath?.isTSTypeReference();
module.exports.isInsideTypeParameter = (path) => path.isIdentifier() && path.parentPath?.isTSTypeParameter();
