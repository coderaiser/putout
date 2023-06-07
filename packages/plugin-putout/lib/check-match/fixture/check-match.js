module.exports.match = () => ({
    '__a = __b'(vars, path) {
        
    },
    '__a = __b': (vars, path) => {
        
    }
});

module.exports.replace = () => ({
    '__a = __': '__b = __a',
});
