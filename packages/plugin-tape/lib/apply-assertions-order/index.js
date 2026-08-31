import {operator, print} from 'putout';

const {
    compare,
    insertBefore,
    remove,
} = operator;

const printNode = (a) => print(a, {
    printer: ['putout', {
        format: {
            newline: '',
        },
    }],
});

export const report = ({prev, assertion}) => {
    return `Use '${printNode(prev)}' before '${printNode(assertion)}'`;
};

export const fix = ({prev, assertion}) => {
    const prevNode = prev.node;
    
    remove(prev);
    insertBefore(assertion, prevNode);
};

export const traverse = ({push}) => ({
    't.end()': (path) => {
        const prev = path.parentPath.getPrevSibling();
        
        if (!prev.node)
            return;
        
        if (compare(prev, 't.__a(__args)'))
            return;
        
        const assertion = findAssertion(prev);
        
        if (!assertion)
            return;
        
        push({
            path,
            prev,
            assertion,
        });
    },
});

function findAssertion(path) {
    const prev = path.getPrevSibling();
    
    if (compare(prev, 't.__a(__args)'))
        return prev;
    
    if (!prev.node)
        return null;
    
    return findAssertion(prev);
}
