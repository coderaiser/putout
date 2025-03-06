'use strict';

const {
    operator,
    types,
    template,
} = require('putout');

const {
    objectProperty,
    objectExpression,
    arrayExpression,
    identifier,
    spreadElement,
} = types;

const {
    replaceWith,
    getProperties,
    __json,
} = operator;

const createFlatConfig = template(`export default %%flatConfig%%`);

module.exports.report = () => 'Use FlatConfig instead of ESLintRC';

module.exports.replace = () => ({
    [__json]: (__json, path) => {
        const __jsonPath = path.get('arguments.0');
        const {
            overridesPath,
            parserPath,
            rulesPath,
        } = getProperties(__jsonPath, ['parser', 'rules', 'overrides']);
        
        const safeAlign = spreadElement(identifier('safeAlign'));
        const flatConfig = arrayExpression([safeAlign]);
        
        if (parserPath || rulesPath) {
            const config = objectExpression([]);
            
            if (parserPath)
                config.properties.push(objectProperty(identifier('languageOptions'), objectExpression([parserPath.node])));
            
            if (rulesPath)
                config.properties.push(rulesPath.node);
            
            flatConfig.elements.push(config);
        }
        
        if (overridesPath)
            flatConfig.elements.push(...overridesPath.node.value.elements);
        
        replaceWith(path, createFlatConfig({
            flatConfig,
        }));
        
        return path;
    },
});
