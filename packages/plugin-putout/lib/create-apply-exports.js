const {entries} = Object;

const report = (path) => {
    const namePath = path.get('declaration.callee');
    const {name} = namePath.node;
    
    return `Apply exports to '${name}()'`;
};

export const createApplyExports = (defaultOptions = {}) => {
    return {
        report,
        replace: createReplace(defaultOptions),
    };
};

export const createReplace = (defaultOptions) => ({options}) => {
    const result = {};
    const all = {
        ...defaultOptions,
        ...options,
    };
    
    for (const [name, exports] of entries(all)) {
        const from = `export default ${name}(__args)`;
        
        result[from] = `{
            const {${exports.join(', ')}} = ${name}(__args);
            export {
                ${exports.join(',\n')}
            }
        }`;
    }
    
    return result;
};
