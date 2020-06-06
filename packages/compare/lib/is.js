'use strict';

const {template} = require('@putout/engine-parser');
const {
    isBlockStatement,
    isIdentifier,
    isLiteral,
    isFunction,
    isImportDefaultSpecifier,
} = require('@babel/types');

const isStr = (a) => typeof a === 'string';

const ANY_OBJECT = '__object';
const ANY_ARRAY = '__array';
const ARGS = '__args';
const IMPORTS = '__imports';
const BODY = '__body';
const NOP = '__nop';
const ANY = '__';
const ID = '__identifier';

const LINKED_NODE = /^__[a-z]$/;
const LINKED_ARGS = /__args__[a-z]$/;
const LINKED_ID = /^__identifier__[a-z]$/;

const ALL = [
    ANY_OBJECT,
    ANY_ARRAY,
    ARGS,
    IMPORTS,
    BODY,
    ANY,
    ID,
    LINKED_NODE,
    LINKED_ARGS,
    LINKED_ID,
];

module.exports.isTemplate = (a) => /[(;={]/.test(a) | !/[A-Z]/.test(a);

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
module.exports.isArgsStr = (a) => a === ARGS || LINKED_ARGS.test(a);
module.exports.isObjectStr = (a) => a === ANY_OBJECT;
module.exports.isArrayStr = (a) => a === ANY_ARRAY;
module.exports.isAnyStr = (a) => a === ANY;

const isBody = (a) => isIdentifier(a, {
    name: BODY,
});

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

const isEqualType = (a, b) => a.type === b.type;
const {isArray} = Array;

module.exports.isId = isId;
module.exports.isEqualType = isEqualType;
module.exports.isStr = (a) => typeof a === 'string';
module.exports.isAny = (a) => isIdentifier(a, {name: ANY});
module.exports.isAnyLiteral = (a, b) => isLiteral(b, {value: ANY}) && isEqualType(a, b);
module.exports.isArgs = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    return isIdentifier(b, {
        name: ARGS,
    });
};

module.exports.isLinkedArgs = (a) => {
    const b = !isArray(a) ? a : a[0];
    return isIdentifier(b) && LINKED_ARGS.test(b.name);
};

module.exports.isLinkedId = (a, b) => {
    if (!isIdentifier(b) || !LINKED_ID.test(b.name))
        return false;
    
    return isIdentifier(a);
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
    
    if (a.length !== b.length)
        return false;
    
    return true;
};

module.exports.isImports = (a) => {
    const b = !isArray(a) ? a : a[0];
    
    if (!isImportDefaultSpecifier(b))
        return false;
    
    return isIdentifier(b.local, {
        name: IMPORTS,
    });
};

const __OBJECT_TYPE = 'ObjectPattern|ObjectExpression';
const __ARRAY_TYPE = 'ArrayPattern|ArrayExpression';

module.exports.isEqualAnyArray = (node, baseNode) => {
    if (!isAnyArray(baseNode))
        return false;
    
    const {type} = node;
    return __ARRAY_TYPE.includes(type);
};

module.exports.isEqualAnyObject = (node, baseNode) => {
    if (!isAnyObject(baseNode))
        return false;
    
    const {type} = node;
    return __OBJECT_TYPE.includes(type);
};

module.exports.isEqualBody = (node, baseNode) => {
    if (!isBody(baseNode))
        return false;
    
    return node.type === 'BlockStatement';
};

module.exports.isEqualNop = (node, baseNode) => {
    if (!isNop(baseNode))
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
    
    return false;
};

module.exports.parseTemplate = (tmpl, {program} = {}) => {
    const parse = !program ? template.ast : template.program.ast;
    const node = parse(tmpl);
    
    if (tmpl === ANY_OBJECT)
        return [node, __OBJECT_TYPE];
    
    if (tmpl === ANY_ARRAY)
        return [node, __ARRAY_TYPE];
    
    const {type} = node;
    
    return [node, type];
};

