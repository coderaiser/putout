export const report = () => '';
export const replace = ({options}) => {
    const {from = '', to = ''} = options;
    
    if (!from || !to)
        return {};
    
    return {
        [`import __imports from '${from}'`]: `import __imports from '${to}'`,
        [`import('${from}')`]: `import('${to}')`,
    };
};
