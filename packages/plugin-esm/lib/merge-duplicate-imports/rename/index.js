import {types, operator} from 'putout';

const {rename, remove} = operator;
const {isImportDefaultSpecifier} = types;

export const report = () => 'Avoid duplicate imports';

export const fix = ({path, imports}) => {
    const {name} = path.node.specifiers[0].local;
    remove(path);
    
    const [first, ...other] = imports;
    
    const firstName = first.node.specifiers[0].local.name;
    rename(first, firstName, name);
    
    for (const current of other) {
        const currentName = current.node.specifiers[0].local.name;
        rename(current, currentName, name);
        remove(current);
    }
};

export const traverse = ({push, uplist}) => ({
    ImportDeclaration: (path) => {
        const {value} = path.node.source;
        const [specifier, ...other] = path.node.specifiers;
        
        if (other.length)
            return;
        
        if (!isImportDefaultSpecifier(specifier))
            return;
        
        uplist(value, path);
    },
    Program: {
        exit() {
            for (const items of uplist()) {
                if (items.length < 2)
                    continue;
                
                const [path, ...imports] = items;
                
                push({
                    path,
                    imports,
                });
            }
        },
    },
});
