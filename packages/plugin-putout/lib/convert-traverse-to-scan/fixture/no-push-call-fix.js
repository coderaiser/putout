module.exports.scan = (path, {push}) => {
    findFile(path, '*.test.*').map(push);
};
