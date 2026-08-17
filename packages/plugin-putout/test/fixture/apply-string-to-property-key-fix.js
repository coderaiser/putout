import {types} from 'putout';

const {identifier} = types;

export const replace = {
    ['section("@select", select(__args))']: ({__args}, path) => {
        __args.unshift(identifier('id'));
        return path;
    },
    [`${x}`]: ({__args}, path) => {
        __args.unshift(identifier('id'));
        return path;
    },
};
