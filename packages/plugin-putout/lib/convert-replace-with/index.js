'use strict';

const {
    operate,
    template,
} = require('putout');

const {
    replaceWith,
    insertAfter,
} = operate;

const fullstore = require('fullstore');

module.exports.report = () => {
    return `"operate.replaceWith" should be called instead of "path.replaceWith"`;
};

const replaceWithAST = template.ast(`
    const {replaceWith} = require('putout').operate;
`);

module.exports.fix = ({path, calleePath, property, object, program, isInserted}) => {
    replaceWith(calleePath, property);
    const strictModePath = program.get('body.0');
    const {bindings} = strictModePath.scope;
    
    path.node.arguments.unshift(object);
    
    if (!bindings.replaceWith && !isInserted()) {
        isInserted(true);
        insertAfter(strictModePath, replaceWithAST);
    }
};

module.exports.traverse = ({push}) => {
    const isInserted = fullstore();
    
    return {
        CallExpression(path) {
            const calleePath = path.get('callee');
            
            if (!calleePath.isMemberExpression())
                return;
            
            const callee = calleePath.node;
            const {object, property} = callee;
            
            if (property.name !== 'replaceWith')
                return;
            
            const program = path.findParent((path) => path.isProgram());
            
            push({
                isInserted,
                path,
                object,
                program,
                property,
                calleePath,
            });
        },
    };
};

