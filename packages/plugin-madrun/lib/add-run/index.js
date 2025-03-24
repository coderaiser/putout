import {
    operator,
    template,
    types,
} from 'putout';

const {isProgram} = types;
const {findBinding} = operator;

const node = template.ast(`const {run} = require('madrun')`);

export const report = () => 'run should be declared';

export const fix = (path) => {
    path.node.body.unshift(node);
};

export const traverse = ({push}) => {
    let added = false;
    
    return {
        'run(__args)'(path) {
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
