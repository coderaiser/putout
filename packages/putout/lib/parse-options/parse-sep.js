import process from 'node:process';

export default (a) => {
    a = wild(a);
    
    if (process.platform !== 'win32')
        return a;
    
    return a.replace(/\//g, `\\\\`);
};

function wild(str) {
    const wildcard = str
        .replace(/\./g, `\\.`)
        .replace(/\*/g, `.*`);
    
    return wildcard;
}
