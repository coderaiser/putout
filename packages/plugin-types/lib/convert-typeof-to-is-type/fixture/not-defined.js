module.exports.btoa = (str) => {
    if (typeof btoa === 'function')
        return btoa(str);
    
    return 'xxx';
};
