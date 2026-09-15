import {types, operator} from 'putout';

const {
    replaceWithMultiple,
    remove,
} = operator;

const {
    binaryExpression,
    ifStatement,
} = types;

export const report = () => `Use 'if' instead of 'switch'`;

export const fix = (path) => {
    const nodes = [];
    const {discriminant} = path.node;
    const defaultCase = [];
    
    for (const currentCase of path.get('cases')) {
        const {test, consequent} = currentCase.node;
        
        if (!test) {
            defaultCase.push(...consequent);
            continue;
        }
        
        const node = ifStatement(binaryExpression(
            '===',
            discriminant,
            test,
        ), consequent[0]);
        
        nodes.push(node);
    }
    
    nodes.push(...defaultCase);
    
    path.traverse({
        BreakStatement(path) {
            remove(path);
        },
    });
    
    replaceWithMultiple(path, nodes);
};

export const traverse = ({push}) => ({
    SwitchStatement: (path) => {
        for (const currentCase of path.get('cases')) {
            if (!hasReturn(currentCase))
                return;
        }
        
        push(path);
    },
});

function hasReturn(path) {
    let is = false;
    
    path.traverse({
        ReturnStatement() {
            is = true;
        },
    });
    
    return is;
}
