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
} = types;

const createFlatConfig = template(`export default %%flatConfig%%`);

module.exports.report = () => 'Use FlatConfig instead of ESLintRC';

module.exports.replace = () => ({
    [__json]: (__json, path) => {
        const __jsonPath = path.get('arguments.0');
        const {
            extendsPath,
            overridesPath,
            parserPath,
            rulesPath,
        } = getProperties(__jsonPath, [
            'extends',
            'parser',
            'rules',
            'overrides',
        ]);
        
        const flatConfig = ArrayExpression([]);
        
        if (extendsPath)
            flatConfig.elements.push(Identifier('safeAlign'));
        
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
