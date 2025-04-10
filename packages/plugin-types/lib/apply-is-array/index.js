export const report = () => `Use 'Array.isArray()' instead of 'instanceof'`;

export const replace = ({options}) => {
    const {inline} = options;
    
    return {
        '__a instanceof Array': () => {
            if (inline)
                return 'Array.isArray(__a)';
            
            return 'isArray(__a)';
        },
    };
};
