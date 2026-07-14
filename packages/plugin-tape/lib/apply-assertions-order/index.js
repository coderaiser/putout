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

export const report = ({prev, prevPrev}) => {
    return `Use '${printNode(prev)}' before '${printNode(prevPrev)}'`;
};

export const fix = ({prev, prevPrev}) => {
    const prevNode = prev.node;
    
    remove(prev);
    insertBefore(prevPrev, prevNode);
};

export const traverse = ({push}) => ({
    't.end()': (path) => {
        const prev = path.parentPath.getPrevSibling();
        const prevPrev = prev.getPrevSibling();
        
        if (compare(prev, 't.__a(__args)'))
            return;
        
        push({
            path,
            prev,
            prevPrev,
        });
    },
});
