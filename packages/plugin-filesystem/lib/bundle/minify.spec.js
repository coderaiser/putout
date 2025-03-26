import Clean from 'clean-css';

export const minify = (data, config) => {
    const {
        styles,
        errors,
        warnings,
    } = new Clean(config).minify(data);
    
    const [error] = errors;
    const [warning] = warnings;
    
    if (error)
        throw Error(error);
    
    if (warning)
        throw Error(warning);
    
    return styles;
};
