'use strict';

const justCamelCase = require('just-camel-case');
const {types, template} = require('putout');

const TEST = `
    const test = require('@putout/test')(__dirname, {
        __a: __b
    });
`;

const TRANSFORM = `
    t.transform(__c, {
        __a: __b
    });
`;

const {
    isIdentifier,
    isObjectExpression,
    isMemberExpression,
    identifier,
} = types;

module.exports.report = () => 'Move require on top level';

module.exports.match = () => ({
    [TEST]: ({__b}) => !isIdentifier(__b),
    [TRANSFORM]: ({__b}) => !isIdentifier(__b) && !isObjectExpression(__b) && !isMemberExpression(__b),
});

module.exports.replace = () => ({
    [TEST]: (vars, path) => {
        const name = declareRequire(vars, path);
        const {__a} = vars;
        const value = __a.value || __a.name;
        
        return `
            const test = require('@putout/test')(__dirname, {
                '${value}': ${name},
            });
        `;
    },
    [TRANSFORM]: (vars, path) => {
        const name = declareRequire(vars, path);
        const {__a} = vars;
        const value = __a.value || __a.name;
        
        return `
            t.transform(__c, {
                '${value}': ${name},
            });
    `;
    },
});

const buildRequire = template(`const NAME = REQUIRE`);

function declareRequire({__a, __b}, path) {
    const shortName = __a.value || __a
        .name
        .split('/')
        .pop();
    
    const name = justCamelCase(shortName);
    
    const requireNode = buildRequire({
        NAME: identifier(name),
        REQUIRE: __b,
    });
    
    if (path.scope.hasBinding(name))
        return name;
    
    const programPath = path.scope.getProgramParent().path;
    
    programPath.node.body.unshift(requireNode);
    
    return name;
}
