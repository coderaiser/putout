'use strict';

const {types} = require('@putout/babel');
const {
    StringLiteral,
    ExpressionStatement,
} = types;

const {assign} = Object;

module.exports = (ast) => {
    const {body, directives} = ast.program;
    
    if (!directives.length)
        return ast;
    
    ast.program.directives = [];
    
    for (const directive of directives) {
        const {leadingComments} = directive;
        const {value} = directive.value;
        const expression = assign(ExpressionStatement(StringLiteral(value)), {
            leadingComments,
        });
        
        body.unshift(expression);
    }
    
    return ast;
};
