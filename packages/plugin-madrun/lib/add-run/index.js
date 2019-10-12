'use strict';

const {
    operate,
    template,
    types,
} = require('putout');

const {isProgram} = types;
const {findBinding} = operate;

const node = template.ast(`const {run} = require('madrun')`);

module.exports.report = () => 'run should be declared';

module.exports.fix = (path) => {
    path.node.body.unshift(node);
};

module.exports.traverse = ({push}) => {
    let added = false;
    
    return {
        'run()'(path) {
            if (added)
                return;
            
            if (findBinding(path, 'run'))
                return;
            
            added = true;
            
            const program = path.findParent(isProgram);
            
            push(program);
        },
    };
};

