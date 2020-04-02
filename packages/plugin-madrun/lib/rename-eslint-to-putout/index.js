'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

const replace = (a) => a
    .replace('eslint', 'putout')
    .replace(/\s--ignore.*/, '');

module.exports.report = () => `"putout" should be used instead of "eslint"`;

module.exports.fix = (path) => {
    const {node} = path;
    const {type, value} = node;
    
    switch(type) {
    case 'StringLiteral':
        return node.value = replace(value);
    
    case 'TemplateElement':
        return node.value.raw = replace(value.raw);
    }
};

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __object'(path) {
            const properties = path.get('right.properties');
            
            for (const prop of properties) {
                const {key} = prop.node;
                
                if (!isStringLiteral(key))
                    continue;
                
                if (key.value !== 'lint')
                    continue;
                
                const body = prop.get('value.body');
                
                if (body.isStringLiteral() && /^eslint/.test(body.node.value))
                    return push(body);
                
                if (body.isTemplateLiteral() && /^eslint/.test(body.node.quasis[0].value.raw))
                    return push(body.get('quasis.0'));
            }
        },
    };
};
