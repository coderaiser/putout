import {
    template,
    types,
    operator,
} from 'putout';

const {remove, replaceWith} = operator;
const {
    importSpecifier,
    isObjectPattern,
    isIdentifier,
} = types;

export const report = () => `Use 'import' instead of 'const'`;

export const fix = ({path, second, third}) => {
    const {value} = third.node.expression;
    const {id} = path.node.declarations[0];
    
    if (isIdentifier(id)) {
        const nodeImport = template.ast(`import ${id.name} from '${value}'`);
        replaceWith(path, nodeImport);
        
        return;
    }
    
    if (isObjectPattern(id)) {
        const nodeImport = template.ast.fresh(`import {} from '${value}'`);
        
        for (const {key, value} of id.properties) {
            nodeImport.specifiers.push(importSpecifier(key, value));
        }
        
        replaceWith(path, nodeImport);
    }
    
    remove(second);
    remove(third);
};

export const traverse = ({push}) => ({
    VariableDeclaration(path) {
        if (path.node.declarations[0].init)
            return;
        
        const second = path.getNextSibling();
        
        if (!second.isExpressionStatement())
            return;
        
        if (!second.get('expression').isIdentifier({name: 'from'}))
            return;
        
        const third = second.getNextSibling();
        
        if (!third.isExpressionStatement())
            return;
        
        if (!third.get('expression').isStringLiteral())
            return;
        
        push({
            path,
            second,
            third,
        });
    },
});
