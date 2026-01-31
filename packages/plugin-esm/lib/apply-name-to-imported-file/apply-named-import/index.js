import {types} from 'putout';

const {isImportDefaultSpecifier} = types;

export const report = (path) => {
    const source = path.node.source.value;
    const {specifiers} = path.node;
    const [first] = specifiers;
    
    if (isImportDefaultSpecifier(first)) {
        const {local} = first;
        const {name} = local;
        
        return `'import ${name} from "${source}"' -> 'import {${name}} from "${source}"'`;
    }
    
    const {exported} = first;
    const {name} = exported;
    
    return `'export * as ${name} from "${source}"' -> 'export {${name}} from "${source}"'`;
};

export const replace = ({options}) => {
    const {name, source} = options;
    
    return {
        [`import ${name} from "${source}"`]: `import {${name}} from "${source}"`,
        [`export * as ${name} from "${source}"`]: `export {${name}} from "${source}"`,
    };
};
