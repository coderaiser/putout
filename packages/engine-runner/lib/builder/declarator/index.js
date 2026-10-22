import {declare as index} from '@putout/operator-declare';

const {stringify} = JSON;
const isFn = (a) => typeof a === 'function';

export const declare = ({rule, plugin, msg, options}) => {
    validateDeclare(plugin.declare);
    
    return {
        rule,
        plugin: index(plugin.declare()),
        msg,
        options,
    };
};

function validateDeclare(declare) {
    if (!isFn(declare))
        throw Error(`☝️ Looks like 'declare' property value is not a 'function', but '${typeof declare}' with value '${stringify(declare)}'.`);
}
