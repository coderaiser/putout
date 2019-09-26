module.exports.find = (ast, {traverse}) => {
    const vars = getVars(ast, {
        setPath: true,
        traverse,
    });
}
