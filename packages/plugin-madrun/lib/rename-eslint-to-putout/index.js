'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

const replace = (a) => a
    .replace('eslint', 'putout')
    .replace(/\s--ignore.*/, '');

module.exports.report = () => `"putout" should be used instead of "eslint"`;

module.exports.fix = (path) => {
    const {value} = path.node;
    
    if (path.isStringLiteral())
        return path.node.value = replace(value);
    
    if (path.isTemplateElement())
        return path.node.value.raw = replace(value.raw);
};

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __object'(path) {
            const properties = path.get('right.properties');
            
            for (const prop of properties) {
                const {key} = prop.node;
                
                if (!isStringLiteral(key))
                    continue;
                
                const body = prop.get('value.body');
                
                if (body.isStringLiteral() && body.node.value.includes('eslint'))
                    return push(body);
                
                if (body.isTemplateLiteral() && body.node.quasis[0].value.raw.includes('eslint'))
                    return push(body.get('quasis.0'));
            }
        },
    
    };
};
