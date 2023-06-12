'use strict';

const {operator} = require('putout');
const {
    getExportDefault,
    getProperty,
} = operator;

module.exports.report = () => `Call 'await cutEnv(script)' instead of 'script'`;

module.exports.replace = () => ({
    '[__a, __b]': '[__a, cutEnv(__b)]',
});

module.exports.match = () => ({
    '[__a, __b]': ({__b}, path) => {
        const exportDefault = getExportDefault(path);
        
        if (!exportDefault)
            return false;
        
        if (path.parentPath.isCallExpression())
            return false;
        
        const declarationPath = exportDefault.get('declaration');
        const property = getProperty(declarationPath, __b.value);
        
        return Boolean(property);
    },
});
