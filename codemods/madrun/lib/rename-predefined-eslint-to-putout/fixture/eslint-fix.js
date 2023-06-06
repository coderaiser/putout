const {putout} = predefined;

module.exports = {
    'lint': () => {
        const names = [
            'bin',
            'lib',
            'test',
            'madrun.js',
        ];
        
        return putout({
            names,
        });
    },
};
