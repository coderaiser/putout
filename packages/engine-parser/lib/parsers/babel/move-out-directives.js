'use strict';

const {
    StringLiteral,
    ExpressionStatement,
} = require('@babel/types');

module.exports = (ast) => {
    const {
        body,
        directives,
    } = ast.program;
    
    if (!directives.length)
        return ast;
    
    ast.program.directives = [];
    
    for (const directive of directives) {
        const {value} = directive.value;
        
        body.unshift(
            ExpressionStatement(StringLiteral(value)),
        );
    }
    
    return ast;
};

