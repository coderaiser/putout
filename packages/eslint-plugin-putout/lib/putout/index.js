import {putoutSync} from './sync.js';

const getContextOptions = ({options}) => {
    const [allContextOptions = {}] = options;
    return allContextOptions;
};

export default {
    meta: {
        messages: [],
        type: 'suggestion',
        docs: {
            description: 'Putout',
            category: 'putout',
            recommended: true,
        },
        schema: false,
        defaultOptions: [],
        fixable: 'code',
    },
    
    create(context) {
        const {esm, ...options} = getContextOptions(context);
        
        return putoutSync({
            context,
            options,
        });
    },
};
