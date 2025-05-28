import {types, operator} from 'putout';

const {remove} = operator;

const {
    isExpressionStatement,
    isFunctionDeclaration,
    isBlockStatement,
} = types;

const not = (fn) => (...a) => !fn(...a);

export const report = () => `Avoid unreachable code`;

export const fix = ({siblings}) => {
    siblings.map(remove);
};

export const traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        let nextPath = path;
        
        while (nextPath.parentPath?.isBlockStatement()) {
            const siblings = nextPath
                .getAllNextSiblings()
                .filter(not(isFunctionDeclaration));
            
            const prevPath = nextPath;
            
            nextPath = nextPath.parentPath;
            
            if (!siblings.length)
                continue;
            
            const {argument} = path.node;
            
            if (checkFirstSibling({argument, siblings}))
                continue;
            
            push({
                path: prevPath,
                siblings,
            });
        }
    },
});

function checkFirstSibling({argument, siblings}) {
    if (argument)
        return false;
    
    const [first] = siblings;
    
    if (isBlockStatement(first))
        return true;
    
    return isExpressionStatement(first);
}
