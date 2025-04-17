import {operator} from 'putout';

const {remove} = operator;

export const report = () => 'Avoid duplicate interface keys';

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    TSInterfaceBody(path) {
        const props = {};
        
        for (const prop of path.get('body')) {
            if (prop.isTSIndexSignature())
                continue;
            
            if (prop.isTSCallSignatureDeclaration())
                continue;
            
            if (prop.isTSConstructSignatureDeclaration())
                continue;
            
            if (prop.isTSMethodSignature())
                continue;
            
            const current = getCurrent(prop);
            const {computed} = prop.node;
            
            if (computed)
                continue;
            
            if (props[current])
                push(props[current]);
            
            props[current] = prop;
        }
    },
});

function getCurrent(path) {
    const keyPath = path.get('key');
    const {node} = keyPath;
    
    if (keyPath.isIdentifier())
        return node.name;
    
    return node.value;
}
