import {operator} from 'putout';

const {rename} = operator;

export const report = () => 'Use addArgs instead of addArgument';

export const replace = () => ({
    'addArgument(__args)': (vars, path) => {
        const program = path.scope.getProgramParent().path;
        rename(program, 'addArgument', 'addArgs');
        
        return path;
    },
});
