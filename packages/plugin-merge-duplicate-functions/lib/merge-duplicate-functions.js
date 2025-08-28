import {types, operator} from 'putout';

const {
    compare,
    remove,
    rename,
} = operator;

const {isExportNamedDeclaration} = types;

const {keys} = Object;

export const report = () => 'Avoid duplicate functions';

export const fix = ({path, duplicatePath}) => {
    const {name} = path.get('id').node;
    const {name: duplicateName} = duplicatePath.get('id').node;
    
    rename(path, duplicateName, name);
    remove(duplicatePath);
};

export const traverse = ({push}) => ({
    Program({scope}) {
        const {bindings} = scope;
        const names = keys(bindings);
        const bodies = [];
        
        for (const i of keys(names)) {
            for (const j of keys(names)) {
                if (i === j)
                    continue;
                
                const fn1 = names[i];
                const fn2 = names[j];
                
                const fnPath1 = bindings[fn1].path;
                const fnPath2 = bindings[fn2].path;
                
                const parentPath1 = fnPath1.parentPath.parentPath;
                const parentPath2 = fnPath2.parentPath.parentPath;
                
                if (isExportNamedDeclaration(parentPath1))
                    continue;
                
                if (isExportNamedDeclaration(parentPath2))
                    continue;
                
                if (!fnPath1.isVariableDeclarator())
                    continue;
                
                if (!fnPath2.isVariableDeclarator())
                    continue;
                
                const initPath1 = fnPath1.get('init');
                const initPath2 = fnPath2.get('init');
                
                if (!initPath1.isFunction())
                    continue;
                
                if (!initPath2.isFunction())
                    continue;
                
                if (initPath1.node.type !== initPath2.node.type)
                    continue;
                
                if (initPath1.node.body.type !== initPath2.node.body.type)
                    continue;
                
                if (initPath1.node.body?.body?.length !== initPath2.node.body?.body?.length)
                    continue;
                
                if (compare(initPath1, initPath2))
                    bodies.push({
                        path: fnPath1,
                        duplicatePath: fnPath2,
                    });
            }
        }
        
        for (const {path, duplicatePath} of bodies) {
            if (!path.node || !duplicatePath.node)
                continue;
            
            push({
                path,
                duplicatePath,
            });
        }
    },
});
