import {operator} from 'putout';

const {getBindingPath} = operator;

export const report = () => `Declare 'path' variable`;

export const match = () => ({
    '(__a) => __body': (vars, path) => {
        let is = false;
        
        path.traverse({
            ReferencedIdentifier(refPath) {
                if (refPath.node.name !== 'path')
                    return;
                
                if (getBindingPath(refPath, 'path'))
                    return;
                
                is = true;
                path.stop();
            },
        });
        
        return is;
    },
});

export const replace = () => ({
    '(__a) => __body': '(__a, path) => __body',
});
