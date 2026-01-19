export const report = () => '';
export const replace = ({options}) => {
    const {from = '', to = ''} = options;
    
    if (!from || !to)
        return {};
    
    return {
        [`require('${from}')`]: `require('${to}')`,
    };
};
