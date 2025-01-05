'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

const replace = (a) => a
    .replace('eslint', 'putout')
    .replace(/\s--ignore.*/, '');

module.exports.report = () => `"putout" should be used instead of "eslint"`;

module.exports.fix = ({node}) => {
    const {type, value} = node;
    
    switch(type) {
    case 'StringLiteral':
        return node.value = replace(value);
    
    case 'TemplateElement':
        return node.value.raw = replace(value.raw);
    }
};

module.exports.traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const properties = path.get('right.properties');
        
        for (const prop of properties) {
            const {key} = prop.node;
            
            if (!isStringLiteral(key))
                continue;
            
            if (key.value !== 'lint')
                continue;
            
            const body = prop.get('value.body');
            
            if (body.isStringLiteral() && body.node.value.startsWith('eslint'))
                return push(body);
            
            if (body.isTemplateLiteral() && body.node.quasis[0].value.raw.startsWith('eslint'))
                return push(body.get('quasis.0'));
        }
    },
});
