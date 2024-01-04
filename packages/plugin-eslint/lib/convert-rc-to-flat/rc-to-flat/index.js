'use strict';

const {operator, types} = require('putout');
const putout = require('putout');

const {getProperties, __json} = operator;
const {
    ObjectExpression,
    ObjectProperty,
} = types;

module.exports.report = () => 'Use FlatConfig instead of ESLintRC';

module.exports.replace = () => ({
    [__json]: (__json, path) => {
        const __jsonPath = path.get('arguments.0');
        const {
            extendsPath,
            pluginsPath,
            parserPath,
            rulesPath,
        } = getProperties(__jsonPath, [
            'extends',
            'plugins',
            'parser',
            'rules',
        ]);
        let nextExtends = '';
        let nextPlugins = '';
        let languageOptions = '';
        let rules = '';
        
        if (extendsPath)
            nextExtends = 'js.configs.recommended';
        
        if (parserPath)
            languageOptions = `
                languageOptions: {
                    ${parserPath},
                },
            `;
        
        if (rulesPath)
            rules = `
                ${rulesPath},
            `;
        
        if (pluginsPath) {
            const elements = pluginsPath.get('value.elements');
            const properties = [];
            
            for (const {node} of elements) {
                properties.push(ObjectProperty(node, node, true, false));
            }
            
            const plugins = putout
                .print(ObjectExpression(properties))
                .slice(1, -3);
            
            nextPlugins = `
                plugins: ${plugins}
            `;
        }
        
        return `
            export default [
              ${nextExtends}, {
                  ${languageOptions}
                  ${rules}
                  ${nextPlugins}
              }
          ]
        `;
    },
});
