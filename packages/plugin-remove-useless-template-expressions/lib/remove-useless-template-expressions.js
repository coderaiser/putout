'use strict';

module.exports.report = () => `Avoid useless template expressions`;

module.exports.fix = (path) => {
    const expressions = path.get('expressions');
    const quasis = path.get('quasis');
    const {length} = expressions;
    
    for (let i = 0; i < length; i++) {
        const exprPath = expressions[i];
        
        if (exprPath.isLiteral()) {
            const a = quasis[i].node.value.raw;
            const b = quasis[i + 1].node.value.raw;
            const {value} = exprPath.node;
            const result = `${a}${value}${b}`;
            
            quasis[i].remove();
            exprPath.remove();
            
            quasis[i + 1].node.value.raw = result;
        }
    }
};

module.exports.traverse = ({push}) => ({
    TemplateLiteral(path) {
        const expressions = path.get('expressions');
        const {length} = expressions;
        
        if (!length)
            return;
        
        for (const expr of expressions) {
            if (expr.node.leadingComments)
                continue;
            
            if (expr.isLiteral() && !expr.isTemplateLiteral()) {
                push(path);
                break;
            }
        }
    },
});
