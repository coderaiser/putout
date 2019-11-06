'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

module.exports.report = () => `scripts should not have a name "putout", because "putout" is "lint"`;

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
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
    
    };
};
