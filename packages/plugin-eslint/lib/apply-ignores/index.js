'use strict';

const {
    template,
    types,
    operator,
} = require('putout');

const {stringify} = JSON;
const {getProperties, __json} = operator;

const {isIdentifier} = types;
const isId = ({__a}) => isIdentifier(__a);

const DEFAULT = ['**/fixture'];

const createIgnores = (list) => `{
    ignores: ${stringify(list)},
}`;

const createIgnoresLegacy = (list) => template.ast(`({
    "ignorePatterns": ${stringify(list)},
})`);

module.exports.report = () => `Ignore 'fixture'`;

module.exports.match = () => ({
    'module.exports = __a': isId,
    'export default __a': isId,
    [__json]: (vars, path) => {
        const argPath = path.get('arguments.0');
        const {ignorePatternsPath} = getProperties(argPath, ['ignorePatterns']);
        
        return !ignorePatternsPath;
    },
});

module.exports.replace = ({options}) => {
    const {ignores = DEFAULT} = options;
    
    return {
        'module.exports = __a': `module.exports = [...__a, ${createIgnores(ignores)}]`,
        'export default __a': `export default [...__a, ${createIgnores(ignores)}]`,
        [__json]: ({__object}, path) => {
            const {properties} = createIgnoresLegacy(ignores);
            __object.properties.push(...properties);
            
            return path;
        },
    };
};
