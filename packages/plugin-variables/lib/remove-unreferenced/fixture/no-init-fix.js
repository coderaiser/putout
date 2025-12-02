export const getReport = (rule) => {
    let result;
};

export const get = (rule) => {
    return rule;
};

export const get1 = () => {
    const rule = 'hello';
    return rule;
};

export const get2 = () => {
    return 'hello';
};

export const get3 = () => {
    return a;
};

export const get4 = () => {
    let a;
    fn(a);
    return a;
};

export const get5 = () => {
    let a;
    
    a = 6;
    return a;
};
