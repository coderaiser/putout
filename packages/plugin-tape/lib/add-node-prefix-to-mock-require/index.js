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

module.exports.traverse = ({push}) => ({
    [MOCK_REQUIRE](path) {
        const {__a} = getTemplateValues(path, MOCK_REQUIRE);
        
        if (!isStringLiteral(__a))
            return;
        
        if (__a.value.startsWith('node:'))
            return;
        
        if (isBuiltin(__a.value))
            push({
                path,
                __a,
            });
    },
});
