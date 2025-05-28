import {types, operator} from 'putout';

const {remove} = operator;
const {
    isExportNamedDeclaration,
    isTSModuleBlock,
    isTSDeclareFunction,
} = types;

export const report = () => `Avoid useless export specifier`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ExportSpecifier(path) {
        const {node, scope} = path;
        const {local} = node;
        const {name} = local;
        
        if (isTSModuleBlock(path.parentPath.parentPath))
            return;
        
        if (path.parentPath.node.source)
            return;
        
        const prev = path.parentPath.getPrevSibling();
        
        if (isTSDeclareFunction(prev))
            return;
        
        const binding = scope.bindings[name];
        
        if (binding) {
            if (isExportNamedDeclaration(binding.path.parentPath.parentPath))
                push(path);
            
            return;
        }
        
        push(path);
    },
});
