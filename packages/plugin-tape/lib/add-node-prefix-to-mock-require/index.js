import {isBuiltin} from 'node:module';
import {operator, types} from 'putout';

const {isStringLiteral} = types;
const {
    getTemplateValues,
    setLiteralValue,
} = operator;

export const report = ({__a}) => `Add 'node:' prefix: '${__a.value}' -> 'node:${__a.value}'`;

export const fix = ({__a}) => {
    setLiteralValue(__a, `node:${__a.value}`);
};

const MOCK_REQUIRE = 'mockRequire(__a, __b)';
const MOCK_IMPORT = 'mockImport(__a, __b)';

export const traverse = ({push}) => ({
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
