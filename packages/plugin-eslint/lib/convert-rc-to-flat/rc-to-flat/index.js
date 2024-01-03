'use strict';

const putout = require('putout');
const {operator, types} = putout;

const {
    ObjectExpression,
    ObjectProperty,
} = types;

const {getProperties, __json} = operator;

module.exports.report = () => 'Use FlatConfig instead of ESLintRC';

module.exports.replace = () => ({
    [__json]: (__json, path) => {
        const __jsonPath = path.get('arguments.0');
        const {extendsPath, pluginsPath} = getProperties(__jsonPath, ['extends', 'plugins']);
        let nextExtends = '';
        let nextPlugins = '';
        
        if (extendsPath)
            nextExtends = 'js.configs.recommended';
        
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
                  ${nextPlugins}
              }
          ]
        `;
    },
});
