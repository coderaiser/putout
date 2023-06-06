const {eslint} = predefined;

module.exports = {
    'lint': () => {
        const names = [
            'bin',
            'lib',
            'test',
            'madrun.js',
        ];
        
        return eslint({
            names,
            rulesdir,
        });
    },
};
