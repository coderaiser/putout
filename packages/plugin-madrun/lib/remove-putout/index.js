'use strict';

const {types, operator} = require('putout');
const {remove} = operator;
const {isStringLiteral} = types;

module.exports.report = () => `scripts should not have a name "putout", because "putout" is "lint"`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const properties = path.get('right.properties');
        
        for (const prop of properties) {
            const {key} = prop.node;
            
            if (!isStringLiteral(key))
                continue;
            
            if (key.value === 'putout')
                return push(prop);
        }
    },
});
