export const report = () => '';
export const replace = ({options}) => {
    const {
        from = '',
        to = '',
    } = options;
    
    if (!from || !to)
        return {};
    
    if (!to.endsWith('json'))
        return {
            [`import __imports from '${from}'`]: `import __imports from '${to}'`,
            [`export __exports from '${from}'`]: `export __exports from '${to}'`,
            [`export * from '${from}'`]: `export * from '${to}'`,
            [`import('${from}')`]: `import('${to}')`,
        };
    
    return {
        [`import __imports from '${from}'`]: `import __imports from '${to}' with {
            type: 'json',
        }`,
        [`import('${from}')`]: `import('${to}', {
            with: {
                type: 'json',
            }
        })`,
    };
};
