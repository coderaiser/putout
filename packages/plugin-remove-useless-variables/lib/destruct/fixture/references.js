module.exports.fix = (path) => {
    const {node} = path;
    const [declaratorPath, declarationPath] = parseParent(path);
}
