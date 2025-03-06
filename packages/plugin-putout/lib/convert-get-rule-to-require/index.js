'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const camel = require('just-camel-case');
const {
    stringLiteral,
    arrayExpression,
    objectProperty,
    identifier,
} = types;

const {
    replaceWith,
    insertBefore,
    compare,
    getPathAfterRequires,
} = operator;

module.exports.report = () => `Use top-level 'require()' instead of '...getRule()'`;

const REQUIRE = `const __a = require(__b)`;
const createRequire = template(REQUIRE, {
    placeholderPattern: /__/,
});

module.exports.match = () => ({
    'getRule(__a)': match,
    'getRule(__a, __b)': match,
});

module.exports.replace = () => ({
    'getRule(__a)': ({__a}, path) => {
        const name = camel(__a.value);
        const id = identifier(name);
        const node = objectProperty(__a, id);
        
        replaceWith(path.parentPath, node);
        
        addRequire({
            __a,
            id,
            path,
        });
        
        return path;
    },
    'getRule(__a, __b)': ({__a, __b}, path) => {
        const name = camel(__a.value);
        const id = identifier(name);
        const node = objectProperty(__a, arrayExpression([__b, id]));
        
        replaceWith(path.parentPath, node);
        
        addRequire({
            __a,
            id,
            path,
        });
        
        return path;
    },
});

function addRequire({__a, id, path}) {
    const programPath = path.scope.getProgramParent().path;
    const body = programPath.get('body');
    const [first] = body;
    
    const nodeRequire = createRequire({
        __a: id,
        __b: stringLiteral(`./${__a.value}`),
    });
    
    if (compare(first, REQUIRE)) {
        const latest = getPathAfterRequires(body.slice(1));
        insertBefore(latest, nodeRequire);
        
        return path;
    }
    
    programPath.node.body.unshift(nodeRequire);
}

function match({__a}, path) {
    const name = __a.value;
    
    if (!path.parentPath.isSpreadElement())
        return false;
    
    return !path.scope.getAllBindings()[name];
}
