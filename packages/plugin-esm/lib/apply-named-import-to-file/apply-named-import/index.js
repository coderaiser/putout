export const report = (path) => {
    const source = path.node.source.value;
    const {specifiers} = path.node;
    const [{local}] = specifiers;
    const {name} = local;
    
    return `'import ${name} from "${source}"' -> 'import {${name}} from "${source}"'`;
};

export const replace = ({options}) => {
    const {name, source} = options;
    
    return {
        [`import ${name} from "${source}"`]: `import {${name}} from "${source}"`,
    };
};
