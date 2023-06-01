'use strict';

module.exports.report = () => `Use 'Array.isArray()' instead of 'instanceof'`;

module.exports.replace = ({options}) => {
    const {inline} = options;
    
    return {
        '__a instanceof Array': () => {
            if (inline)
                return 'Array.isArray(__a)';
            
            return 'isArray(__a)';
        },
    };
};
