'use strict';

const {replaceWith} = require('putout').operator;
const {
    operator,
    types,
    template,
} = require('putout');

const {getProperties, __json} = operator;

const {
    ArrayExpression,
    ObjectExpression,
    ObjectProperty,
    Identifier,
    SpreadElement,
} = types;

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
        
        const safeAlign = SpreadElement(Identifier('safeAlign'));
        const flatConfig = ArrayExpression([safeAlign]);
        
        if (parserPath || rulesPath) {
            const config = ObjectExpression([]);
            
            if (parserPath)
                config.properties.push(ObjectProperty(Identifier('languageOptions'), ObjectExpression([parserPath.node])));
            
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
