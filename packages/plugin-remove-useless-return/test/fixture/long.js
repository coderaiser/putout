module.exports.readFileContent = (name, {readFileSync = readFileSyncOriginal} = {}) => {
    return readFileSync(name, 'utf8');
};
