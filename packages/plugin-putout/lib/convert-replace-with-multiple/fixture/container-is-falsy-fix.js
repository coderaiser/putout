import {operator} from 'putout';

const {rename} = operator;

replaceWithMultiple(path, statements);

export const replace = () => ({
    noop: ({path}) => {
        rename(path, arg.name, `bp`);
    },
});
