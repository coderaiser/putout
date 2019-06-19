'use strict';

module.exports.report = () => 'Unused expression statement';

module.exports.traverse = ({push}) => {
    return {
        ExpressionStatement(path) {
            const expressionPath = path.get('expression');
            
            if (expressionPath.isIdentifier())
                return push(expressionPath);
            
            if (expressionPath.isLiteral()) {
                const {body} = expressionPath.parentPath.parentPath.node;
                
                if (!body.indexOf(expressionPath.parentPath.node))
                    return;
                
                return push(expressionPath);
            }
        },
    };
};

module.exports.fix = (path) => {
    path.remove();
};

