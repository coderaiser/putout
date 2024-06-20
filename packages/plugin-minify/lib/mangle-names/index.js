import {types} from 'putout';
import {computeName} from './compute-name.js';

const {
    isExportNamedDeclaration,
    isClassDeclaration,
} = types;

const {entries, keys} = Object;

export const report = () => `Mangle name`;

const hasScope = ({scope}) => scope.__putout_minify;

export const traverse = ({push, pathStore, store}) => ({
    'Program|BlockStatement'(path) {
        const {bindings} = path.scope;
        const names = keys(bindings);
        
        for (const name of names) {
            if (name.length > 2)
                return pathStore(path);
        }
    },
    'ReferencedIdentifier'(path) {
        const {name} = path.node;
        store(name, {});
        
        if (name.length < 5)
            return;
        
        pathStore(path);
    },
    Program: {
        exit(programPath) {
            const referenced = Object.fromEntries(store.entries());
            
            for (const path of pathStore()) {
                if (hasScope(path))
                    continue;
                
                push({
                    path,
                    programPath,
                    referenced,
                });
            }
        },
    },
});

export const fix = ({path, programPath, referenced}, options) => {
    const {scope} = path;
    const {mangleClassNames} = options;
    const names = entries(scope.bindings);
    const allStore = programPath.__putout_minify_mangle = programPath.__putout_minify_mangle || {};
    
    for (const [index, [name, binding]] of names.entries()) {
        if (name.length < 2)
            continue;
        
        if (!mangleClassNames && isClassDeclaration(binding.path))
            continue;
        
        if (isInsideExport(binding))
            continue;
        
        const all = {
            ...allStore,
            ...scope.getAllBindings(),
            ...referenced,
        };
        
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

function isInsideExport({path}) {
    return isExportNamedDeclaration(path.parentPath.parentPath);
}
