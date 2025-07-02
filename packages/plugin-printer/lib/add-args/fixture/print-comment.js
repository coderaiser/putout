module.exports.printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
    printComment();
    print.breakline();
};
