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
        const putoutSync = require('./sync');
        
        return putoutSync({
            context,
            options,
        });
    },
};
