import {computeName} from './compute-name.js';

const {entries} = Object;

export const report = () => `Mangle name`;

export const traverse = ({push, pathStore, store}) => ({
    BlockStatement(path) {
        pathStore(path);
    },
    'Identifier|ReferencedIdentifier'(path) {
        const {name} = path.node;
        
        if (!path.scope.bindings[name])
            return;
        
        pathStore(path);
        
        store(name, {});
    },
    Program: {
        exit(path) {
            const referenced = Object.fromEntries(store.entries());
            
            push({
                path,
                referenced,
            });
            
            for (const path of pathStore()) {
                push({
                    path,
                    referenced,
                });
            }
        },
    },
});

export const fix = ({path, referenced}, options) => {
    const {scope} = path;
    const {mangleClassNames} = options;
    const names = entries(scope.bindings);
    const programPath = scope.getProgramParent().path;
    const allStore = programPath.__putout_minify_mangle = programPath.__putout_minify_mangle || {};
    
    for (const [index, [name, binding]] of names.entries()) {
        if (!mangleClassNames && binding.path.isClassDeclaration())
            continue;
        
        const all = {
            ...allStore,
            ...scope.getAllBindings(),
            ...referenced,
        };
        
        if (name.length === 1)
            continue;
        
        const newName = generateUid({
            index,
            all,
            scope,
        });
        
        scope.rename(name, newName);
        allStore[newName] = true;
    }
    
    scope.__putout_minify = true;
};

function generateUid({index, all, scope}) {
    const uid = scope.generateUid();
    
    const short = computeName({
        index,
        all,
        uid,
    });
    
    return short;
}
