const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

export default (a) => {
    if (!a)
        return [];
    
    return maybeArray(a);
};
