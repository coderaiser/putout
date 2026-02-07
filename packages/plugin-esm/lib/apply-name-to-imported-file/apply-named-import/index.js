import {types, operator} from 'putout';

const {getTemplateValues} = operator;
const {
    isImportDefaultSpecifier,
    isVariableDeclaration,
} = types;

const DYNAMIC = 'const __identifier__a = await import(__b)';

export const report = (path) => {
    if (isVariableDeclaration(path)) {
        const {
            __identifier__a,
            __b,
        } = getTemplateValues(path, DYNAMIC);
        
        const {name} = __identifier__a;
        const source = __b.value;
        
        return `'const ${name} = await import("${source}")' -> 'const {${name}} = await import("${source}")'`;
    }
    
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
        [`const ${name} = await import("${source}")`]: `const {${name}} = await import("${source}")`,
        [`import ${name} from "${source}"`]: `import {${name}} from "${source}"`,
        [`export * as ${name} from "${source}"`]: `export {${name}} from "${source}"`,
    };
};
