const options = {
    blacklist,
};

module.exports.traverse = ({push}) => ({
    RegExpLiteral(path) {
        const {pattern, flags} = path.node;
        const [error, result] = tryCatch(optimize, RegExp(pattern, flags), whitelist, options);
    }
});
