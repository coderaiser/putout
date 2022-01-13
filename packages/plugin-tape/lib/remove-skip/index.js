'use strict';

module.exports.report = () => '"test.skip" should not be used';

module.exports.replace = () => ({
    '__a.skip(__b, __c)': '__a(__b, __c)',
    '__a.skip(__b, __c, __d)': '__a(__b, __c, __d)',
    '__a["skip"](__b, __c)': '__a(__b, __c)',
});

module.exports.filter = (path) => {
    const {parentPath} = path.parentPath;
    return parentPath.isProgram();
};

