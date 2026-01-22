export const scan = (root, {options, trackFile}) => {
    const {names = ['same.js']} = options;
    
    for (const file of trackFile(root, names)) {
        const name = getFilename(file)
        const content = readFileContent(file);
        const fixContent = readFixFile(name, file);
        
        push(file, {
            name,
        });
    }
};

module.exports.scan = (root) => {
        push(file, {
            name,
        });
};