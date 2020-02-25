'use strict';

module.exports.report = () => '"test.only" should not be used';

module.exports.replace = () => ({
    '__a.only(__b, __c)': '__a(__b, __c)',
    '__a["only"](__b, __c)': '__a(__b, __c)',
});

module.exports.filter = (path) => {
    const {parentPath} = path.parentPath;
    return parentPath.isProgram();
};

