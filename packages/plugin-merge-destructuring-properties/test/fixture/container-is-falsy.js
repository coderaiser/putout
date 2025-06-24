import {operator} from 'putout';
const {rename} = operator;

path.replaceWithMultiple(statements);

export const replace = () => ({
    noop: ({path}) => {
        rename(path, arg.name, `bp`);
    },
});

