'use strict';

const getContextOptions = ({options}) => {
    const [allContextOptions = {}] = options;
    return allContextOptions;
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Putout',
            category: 'putout',
            recommended: true,
        },
        schema: false,
        fixable: 'code',
    },
    
    create(context) {
        const {esm, ...options} = getContextOptions(context);
        
        if (esm) {
            const putoutAsync = require('./async');
            
            return putoutAsync({
                context,
                options,
            });
        }
        
        const putoutSync = require('./sync');
        
        return putoutSync({
            context,
            options,
        });
    },
};
