'use strict';

const {isBuiltin} = require('node:module');
const {operator, types} = require('putout');

const {isStringLiteral} = types;
const {
    getTemplateValues,
    setLiteralValue,
} = operator;

module.exports.report = ({__a}) => `Add 'node:' prefix: '${__a.value}' -> 'node:${__a.value}'`;

module.exports.fix = ({__a}) => {
    setLiteralValue(__a, `node:${__a.value}`);
};

const MOCK_REQUIRE = 'mockRequire(__a, __b)';
const MOCK_IMPORT = 'mockImport(__a, __b)';

module.exports.traverse = ({push}) => ({
    [MOCK_REQUIRE]: createTraverser(push, MOCK_REQUIRE),
    [MOCK_IMPORT]: createTraverser(push, MOCK_IMPORT),
});

const createTraverser = (push, template) => (path) => {
    const {__a} = getTemplateValues(path, template);
    
    if (!isStringLiteral(__a))
        return;
    
    if (__a.value.startsWith('node:'))
        return;
    
    if (isBuiltin(__a.value))
        push({
            path,
            __a,
        });
};
