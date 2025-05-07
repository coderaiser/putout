import {operator} from 'putout';

const {remove, insertAfter} = operator;

export const report = () => `Remove useless nested spread`;

export const fix = ({path, argPath}) => {
    const elements = argPath.get('elements');
    
    for (const element of elements.reverse())
        insertAfter(path, element.node);
    
    remove(path);
};

export const traverse = ({push}) => ({
    SpreadElement(path) {
        const {parentPath} = path;
        const argPath = path.get('argument');
        
        if (parentPath.isCallExpression())
            return;
        
        if (!argPath.isArrayExpression())
            return;
        
        push({
            path,
            argPath,
        });
    },
});
