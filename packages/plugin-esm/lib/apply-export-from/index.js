import {types, operator} from 'putout';

const {
    isExportSpecifier,
    isImportSpecifier,
    exportNamedDeclaration,
    exportNamespaceSpecifier,
    isImportNamespaceSpecifier,
} = types;

const {values} = Object;
const {remove, insertAfter} = operator;

export const report = () => `Use 'export from' instead of 'import' + 'export'`;

export const fix = ({path, reference}) => {
    const {parentPath} = path;
    const parentReference = reference.parentPath;
    const exportNode = createExport(path, parentReference);
    
    insertAfter(parentPath, exportNode);
    removeSpecifier(path);
    removeSpecifier(parentReference);
};

export const traverse = ({push}) => ({
    Program(path) {
        const {bindings} = path.scope;
        const imports = values(bindings).filter(isExported);
        
        for (const {path, referencePaths} of imports) {
            const [reference] = referencePaths;
            
            push({
                path,
                reference,
            });
        }
    },
});

function isExported(binding) {
    const {
        path,
        references,
        referencePaths,
    } = binding;
    
    if (references !== 1)
        return false;
    
    if (!isImportSpecifier(path) && !isImportNamespaceSpecifier(path))
        return false;
    
    const [refPath] = referencePaths;
    
    return isExportSpecifier(refPath.parentPath);
}

function removeSpecifier(path) {
    if (path.parentPath.node.specifiers.length === 1)
        remove(path.parentPath);
    else
        remove(path);
}

function createExport(path, parentReference) {
    const {parentPath} = path;
    const {source} = parentPath.node;
    
    if (isImportSpecifier(path))
        return exportNamedDeclaration(null, [parentReference.node], source);
    
    const {exported} = parentReference.node;
    const specifier = exportNamespaceSpecifier(exported);
    
    return exportNamedDeclaration(null, [specifier], source);
}
