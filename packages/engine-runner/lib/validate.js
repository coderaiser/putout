const isFn = (a) => typeof a === 'function';
const {stringify} = JSON;
const {isArray} = Array;

export const validate = (name, fn) => {
    if (name === 'include-items') {
        if (!isArray(fn))
            throw Error(`☝️ Looks like 'include' do not returns an 'array'. More on using Includer: https://git.io/JqcMn`);
        
        return;
    }
    
    if (!isFn(fn))
        throw Error(`☝️ Looks like '${name}' is not a 'function' but '${typeof fn}' with value: '${stringify(fn)}'. More on using Includer: https://git.io/JqcMn`);
};
